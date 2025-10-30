import React from 'react';
import TVCard from './TVCard.jsx';

const TVList = ({ shows, dispatch }) => {
  return (
    <div className="tv-list">
      {shows.map((item) => (
        <TVCard key={item.show.id} item={item} dispatch={dispatch} />
      ))}
    </div>
  );
};

export default TVList;