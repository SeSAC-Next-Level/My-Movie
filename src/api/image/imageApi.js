import { imageInstance, imageOptionInstance } from '../api';

const imgaeApi = {
  getOption: async () => {
    const response = imageOptionInstance.get('');
    return response.data;
  },
  getImage: async (imagePath, path = '/original') => {
    path === '/' ? path : `/${path}`;
    imagePath = imagePath[0] === '/' ? imagePath : `/${imagePath}`;

    const response = await imageInstance.get(`${path}${imagePath}`);
    return response.data;
  },
};

export default imgaeApi;
