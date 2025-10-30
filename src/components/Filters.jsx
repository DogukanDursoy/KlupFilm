import React from 'react';

const Filters = ({ filters, dispatch }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...filters,
        [name]: name === 'minRating' ? Number(value) : value,
      },
    });
  };

  return (
    <div className="filters">
      <input
        type="text"
        name="genre"
        placeholder="Tür (örn: 'Drama')"
        value={filters.genre}
        onChange={handleFilterChange}
      />
      <select name="language" value={filters.language} onChange={handleFilterChange}>
        <option value="">Tüm Diller</option>
        <option value="English">English</option>
        <option value="Japanese">Japanese</option>
        <option value="Turkish">Turkish</option>
      </select>
      <label>
        Min Puan:
        <input
          type="range"
          name="minRating"
          min="0"
          max="10"
          step="0.5"
          value={filters.minRating}
          onChange={handleFilterChange}
        />
        {filters.minRating}
      </label>
    </div>
  );
};

export default Filters;