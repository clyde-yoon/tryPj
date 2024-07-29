import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://wikied-api.vercel.app/7-3',
  withCredentials: true,
});

export default instance;
