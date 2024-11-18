import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const Authorization = `Bearer ${API_KEY}`;
const headers = { Authorization };

/**
 * @description 영화 관련
 */
export const movieInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/movie`,
  headers,
});

/**
 * @description
 * 장르 목록
 * @todo store에 저장하여 최소 1회면 시행되도록 만들어야 함
 */
export const genreInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/genre/movie/list`,
  headers,
});
