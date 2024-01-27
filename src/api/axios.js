import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://cyberswap.uz/api/docs',
  // Additional configurations like headers can go here
});

export default instance;
