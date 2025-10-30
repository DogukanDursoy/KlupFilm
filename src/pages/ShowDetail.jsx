import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getShowDetails, getShowEpisodes } from '../api/tvmaze.js';
import LoadingSpinner from '../components/ui/LoadingSpinner.jsx';
import ErrorMessage from '../components/ui/ErrorMessage.jsx';

const ShowDetail = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const [detailsResponse, episodesResponse] = await Promise.all([
        getShowDetails(id),
        getShowEpisodes(id),
      ]);
      setDetails(detailsResponse.data);
      setEpisodes(episodesResponse.data);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage onRetry={fetchData} />;
  if (!details) return <p>Dizi bulunamadı.</p>;

  return (
    <div className="show-detail">
      <Link to="/">&larr; Ana Sayfaya Dön</Link>
      <div className="detail-header">
        <img
          src={details.image?.original || 'https://via.placeholder.com/400x560'}
          alt={details.name}
        />
        <div className="detail-info">
          <h1>{details.name}</h1>
          <div
            dangerouslySetInnerHTML={{ __html: details.summary }}
          />
          <p>
            <strong>Tür:</strong> {details.genres?.join(', ')}
          </p>
          <p>
            <strong>Dil:</strong> {details.language}
          </p>
          <p>
            <strong>Puan:</strong> {details.rating?.average}
          </p>
          <p>
            <strong>Durum:</strong> {details.status}
          </p>
        </div>
      </div>

      <div className="episodes-list">
        <h2>Bölümler</h2>
        <ul>
          {episodes.map((ep) => (
            <li key={ep.id}>
              <strong>
                S{ep.season}E{ep.number}:
              </strong>{' '}
              {ep.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShowDetail;