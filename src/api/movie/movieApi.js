import { movieInstance } from '../api';

const movieApi = {
  getNowPlaying: async () => {
    const response = await movieInstance.get('now_playing');
    return response.data;
  },
};

export default movieApi;
