import api from '@/utils/requests/api';
import router from '@/router';
import Cookies from 'js-cookie';

const userModule = {
  namespaced: true,
  state: {
    user: {
      auth: null,
      data: null,
    },
    login: {
      errors: null,
    },
    logout: {
      errors: null,
    },
    snackbar: {
      show: false,
    },
  },
  getters: {
    getUser: (state) => state.user.data ?? JSON.parse(localStorage.getItem('newsapp_user_logged')),
    getLoginErrors: (state) => state.login.errors,
    getIsUserLoggedIn: (state) => state.user.auth ?? !!Cookies.get('newsapp_is_user_logged_in'),
    getIsShowSnackbar: (state) => state.snackbar.show,
    getUrlLoginFacebook: () => `${process.env.VUE_APP_API_URL}/es/user/login/facebook`,
    getUrlLoginGoogle: () => `${process.env.VUE_APP_API_URL}/es/user/login/google`,
  },
  actions: {
    login(context, body) {
      return new Promise((resolve, reject) => {
        api.get('/sanctum/csrf-cookie').then(() => {
          api.post('/fortify/login', body)
            .then(() => {
              Cookies.set('newsapp_is_user_logged_in', true, { expires: 86400, sameSite: 'lax' });
              context.commit('SET_AUTH', true);
              router.push({ name: 'auth' });
              context.dispatch('fetchUserLogged');
              resolve();
            })
            .catch(({ response }) => {
              context.commit('SET_ERRORS', response.data.errors);
              reject(new Error(response.data.message));
            });
        });
      });
    },
    logout(context) {
      api.post('/fortify/logout')
        .then(() => {
          context.commit('SET_AUTH', false);
          localStorage.clear();
          Cookies.remove('newsapp_is_user_logged_in', { expires: 86400, sameSite: 'lax' });
          router.push({ name: 'login' });
        });
    },
    async fetchUserLogged(context) {
      const { data } = await api.get('user/logged');
      context.commit('SET_USER', data.data);
      localStorage.setItem('newsapp_user_logged', JSON.stringify(data.data));
    },
    async fetchEditUserProfile(context, profile) {
      const fd = new FormData();
      for (const key in profile) {
        fd.append(key, profile[key]);
      }
      const { data } = await api.post(`user/profile/edit/${profile.id}`, fd);
      context.commit('SET_USER', data.data);
      localStorage.setItem('newsapp_user_logged', JSON.stringify(data.data));
      context.commit('SET_SHOW_SNACKBAR');
    },
  },
  mutations: {
    SET_ERRORS: (state, errors) => state.login.errors = errors,
    SET_USER: (state, user) => state.user.data = user,
    SET_AUTH: (state, auth) => state.user.auth = auth,
    SET_SHOW_SNACKBAR: (state) => state.snackbar.show = !state.snackbar.show,
  },
};

export default userModule;
