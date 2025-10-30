import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.tvmaze.com',
});

// Arama Endpoint'i
export const searchShows = (query) => {
  return api.get(`/search/shows?q=${query}`);
};

// Detay Endpoint'i
export const getShowDetails = (id) => {
  return api.get(`/shows/${id}`);
};

// Bölümler Endpoint'i
export const getShowEpisodes = (id) => {
  return api.get(`/shows/${id}/episodes`);
};