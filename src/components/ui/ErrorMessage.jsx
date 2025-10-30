import React from 'react';
const ErrorMessage = ({ onRetry }) => (
  <div className="error-message">
    <p>Veri yüklenirken bir hata oluştu.</p>
    <button onClick={onRetry}>Tekrar Dene</button>
  </div>
);
export default ErrorMessage;