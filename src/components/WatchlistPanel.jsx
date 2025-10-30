import React from 'react';

const WatchlistPanel = ({ watchlist, dispatch }) => {
  return (
    <aside className="watchlist-panel">
      <h2>Gösterime Girecekler</h2>
      {watchlist.length === 0 ? (
        <p>Listeniz boş.</p>
      ) : (
        <>
          <ul>
            {watchlist.map((item) => (
              <li key={item.show.id}>
                <span>{item.show.name}</span>
                <button
                  onClick={() =>
                    dispatch({ type: 'REMOVE_WATCHLIST', payload: item.show.id })
                  }
                >
                  Kaldır
                </button>
              </li>
            ))}
          </ul>
          <button onClick={() => dispatch({ type: 'CLEAR_WATCHLIST' })}>
            Listeyi Temizle
          </button>
        </>
      )}
    </aside>
  );
};

export default WatchlistPanel;