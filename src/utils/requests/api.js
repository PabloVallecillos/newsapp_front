import axios from 'axios';
import VueI18n from '@/plugins/i18n';

const instance = axios.create({
  withCredentials: true,
});

instance.interceptors.request.use((request) => {
  request.baseURL = `${process.env.VUE_APP_API_URL}/${VueI18n.locale}`;
  return request;
});

// instance.interceptors.response.use(
//   (response) => response,
//   (err) => {
//     console.log(err.response);
//     return Promise.reject(err);
//   },
// );
export default instance;
