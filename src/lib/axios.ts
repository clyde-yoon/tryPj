import axios from 'axios';

const instance = axios.create({
  baseURL: '/api', // 프록시된 경로
  withCredentials: true,
});

export default instance;
