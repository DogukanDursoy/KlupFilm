import React from 'react';
import { Link } from 'react-router-dom';

const stripHtmlAndTruncate = (html, length) => {
  if (!html) return 'Özet mevcut değil.';
  const text = html.replace(/<[^>]+>/g, '');
  return text.length > length ? text.substring(0, length) + '...' : text;
};

const TVCard = ({ item, dispatch }) => {
  const { show } = item;

  const handleAddWatchlist = () => {
    dispatch({ type: 'ADD_WATCHLIST', payload: item });
  };

  return (
    <div className="tv-card">
      <img
        src={show.image?.medium || 'https://via.placeholder.com/210x295'}
        alt={show.name}
      />
      <div className="tv-card-content">
        <h3>{show.name}</h3>
        <p>
          <strong>Tür:</strong> {show.genres?.join(', ') || 'Bilinmiyor'}
        </p>
        <p>
          <strong>Dil:</strong> {show.language || 'Bilinmiyor'}
        </p>
        <p>
          <strong>Puan:</strong> {show.rating?.average || 'N/A'}
        </p>
        <p className="summary">{stripHtmlAndTruncate(show.summary, 100)}</p>
        <div className="tv-card-actions">
          <Link to={`/show/${show.id}`} className="btn-detail">
            Detay
          </Link>
          <button onClick={handleAddWatchlist} className="btn-add">
            Kısa Listeye Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default TVCard;