import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://newsapi.org/v2/',
  headers: {
    Authorization: `Bearer ${process.env.VUE_APP_NEWS_API_KEY}`,
  },
});

export default instance;
