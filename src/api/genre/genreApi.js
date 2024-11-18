import { genreInstance } from '../api';

const genreApi = {
  getGenre: async () => {
    const response = await genreInstance.get('');
    return response.data;
  },
};

export default genreApi;
