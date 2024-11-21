import { instance, movieInstance } from '../api';

const movieApi = {
  getNowPlaying: async () => {
    const response = await movieInstance.get('now_playing');
    return response.data;
  },
  getMovieByGerneId: async (genreId) => {
    const url = `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`;
    const response = await instance.get(url);
    return response.data;
  },
  // getMoi
};

export default movieApi;
