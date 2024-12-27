import { imageOptionInstance } from '../api';

const imgaeApi = {
  getOption: async () => {
    const response = imageOptionInstance.get('');
    return response.data;
  },
};

export default imgaeApi;
