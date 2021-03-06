import axios from 'axios';

const instance = axios.create({ baseURL: 'https://dog.ceo/api' });

instance.interceptors.response.use(
  ({ data }) => data.message,
  (err) => Promise.reject(err),
);

export default {
  getRandomImages(amount = 20) {
    return instance.get(`/breeds/image/random/${amount}`);
  },

  getAllBreeds() {
    return instance.get('/breeds/list');
  },

  getImagesByBreed(breed, amount = 20) {
    return instance.get(`/breed/${breed}/images/random/${amount}`);
  },
};
