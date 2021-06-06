import axios from 'axios';
import VueI18n from '@/plugins/i18n';
import store from '@/store';
import handleResponseError from '@/utils/requests/handleResponseError';

const instance = axios.create({
  withCredentials: true,
});

instance.interceptors.request.use((request) => {
  request.baseURL = `${process.env.VUE_APP_API_URL}/${VueI18n.locale}`;
  return request;
});

instance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  const { status, data } = error.response;
  if (status === 419 || status === 401) store.dispatch('userModule/logout');
  if (status === 423) {
    store.dispatch('dialogModule/showDialog', {
      vToolBar: {
        color: 'grey lighten-3',
        class: 'black--text',
        title: 'password',
      },
      width: 500,
      zIndex: 200,
      vCardActions: {
        value: true,
      },
    });
  }
  store.dispatch('snackbarModule/showSnackbar',
    {
      color: 'red',
      message: handleResponseError(data.errors ?? data.message),
      translate: false,
    });
  return error;
});
export default instance;
