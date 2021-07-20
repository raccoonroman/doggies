import axios from 'axios';

export default class {
  constructor() {
    this.instance = axios.create({ baseURL: 'https://dog.ceo/api' });
    this.instance.interceptors.response.use(
      ({ data }) => data.message,
      (err) => Promise.reject(err),
    );
  }

  getRandomImages(amount = 20) {
    return this.instance.get(`/breeds/image/random/${amount}`);
  }
}
