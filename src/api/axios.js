import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://cyberswap.uz/api',
});

export default instance;
