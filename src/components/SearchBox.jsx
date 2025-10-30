import React, { useState } from 'react';

const SearchBox = ({ dispatch }) => {
  const [localQuery, setLocalQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localQuery) {
      dispatch({ type: 'SET_QUERY', payload: localQuery });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-box">
      <input
        type="text"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        placeholder="Dizi ara (örn: 'breaking bad')"
      />
      <button type="submit">Ara</button>
    </form>
  );
};

export default SearchBox;