import React, { useEffect, useReducer, useMemo } from 'react';
import { appReducer, initialState as baseInitialState } from '../reducers/appReducer';
import { searchShows } from '../api/tvmaze.js';

import SearchBox from '../components/SearchBox.jsx';
import Filters from '../components/Filters.jsx';
import TVList from '../components/TVList.jsx';
import WatchlistPanel from '../components/WatchlistPanel.jsx';
import Pagination from '../components/Pagination.jsx';
import LoadingSpinner from '../components/ui/LoadingSpinner.jsx';
import ErrorMessage from '../components/ui/ErrorMessage.jsx';
import EmptyResults from '../components/ui/EmptyResults.jsx';

const init = (initialState) => {
  try {
    const storedWatchlist = localStorage.getItem('watchlist');
    const storedFilters = localStorage.getItem('filters');

    return {
      ...initialState,
      watchlist: storedWatchlist ? JSON.parse(storedWatchlist) : initialState.watchlist,
      filters: storedFilters ? JSON.parse(storedFilters) : initialState.filters,
    };
  } catch (error) {
    console.error("localStorage'dan veri okunamadı", error);
    return initialState;
  }
};

const Home = () => {
  const [state, dispatch] = useReducer(appReducer, baseInitialState, init);

  const {
    isLoading,
    isError,
    shows,
    watchlist,
    query,
    filters,
    pagination,
  } = state;

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    localStorage.setItem('filters', JSON.stringify(filters));
  }, [watchlist, filters]);

  useEffect(() => {
    const fetchShows = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const response = await searchShows(query);
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE' });
      }
    };

    if (query) {
      fetchShows();
    }
  }, [query]);

  const paginatedAndFilteredShows = useMemo(() => {
    const filtered = shows.filter((item) => {
      const show = item.show;
      const rating = show.rating?.average || 0;

      const genreMatch =
        !filters.genre ||
        show.genres?.join(' ').toLowerCase().includes(filters.genre.toLowerCase());
      const langMatch =
        !filters.language || show.language === filters.language;
      const ratingMatch = rating >= filters.minRating;

      return genreMatch && langMatch && ratingMatch;
    });

    const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;

    return {
      data: filtered.slice(startIndex, endIndex),
      totalItems: filtered.length,
      totalPages: Math.ceil(filtered.length / pagination.pageSize),
    };
  }, [shows, filters, pagination]);

  const handleRetry = () => {
    dispatch({ type: 'SET_QUERY', payload: baseInitialState.query });
  };

  return (
    <div className="home-layout">
      <header className="home-header">
        <h1>Kampüs Film Kulübü</h1>
        <SearchBox dispatch={dispatch} />
        <Filters filters={filters} dispatch={dispatch} />
      </header>

      <div className="main-content">
        <div className="shows-section">
          {isLoading && <LoadingSpinner />}
          {isError && <ErrorMessage onRetry={handleRetry} />}
          {!isLoading && !isError && paginatedAndFilteredShows.data.length === 0 && (
            <EmptyResults />
          )}
          {!isLoading && !isError && paginatedAndFilteredShows.data.length > 0 && (
            <>
              <TVList
                shows={paginatedAndFilteredShows.data}
                dispatch={dispatch}
              />
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={paginatedAndFilteredShows.totalPages}
                dispatch={dispatch}
              />
            </>
          )}
        </div>
        <WatchlistPanel watchlist={watchlist} dispatch={dispatch} />
      </div>
    </div>
  );
};

export default Home;