import axios from 'axios';

export const MAINURL = 'https://cyberswap.uz/api';
// export const MAINURL = 'http://172.20.10.4:8000/api';

const instance = axios.create({
  baseURL: MAINURL,
});

export default instance;
