import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.cyberswap.uz/api',
  withCredentials: true,
  // Additional configurations like headers can go here
});

export default instance;
