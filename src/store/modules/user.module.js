import api from '@/utils/requests/api';
import router from '@/router';
import Cookies from 'js-cookie';

const userModule = {
  namespaced: true,
  state: {
    user: {
      auth: null,
      twoFactor: false,
      data: null,
      themeDark: false,
    },
    login: {
      errors: null,
    },
    logout: {
      errors: null,
    },
    show: {
      loading: false,
    },
  },
  getters: {
    getUser: (state) => state.user.data ?? JSON.parse(localStorage.getItem('newsapp_user_logged')),
    getIs2fa: (state) => state.user.twoFactor ?? JSON.parse(localStorage.getItem('newsapp_two_factor')),
    getIsUserLoggedIn: (state) => state.user.auth ?? !!Cookies.get('newsapp_is_user_logged_in'),
    getLoading: (state) => state.show.loading,
    getUrlLoginFacebook: () => `${process.env.VUE_APP_API_URL}/es/user/login/facebook`,
    getUrlLoginGoogle: () => `${process.env.VUE_APP_API_URL}/es/user/login/google`,
  },
  actions: {
    fetchLogin(context, body) {
      context.commit('SET_LOADING');
      api.get('/sanctum/csrf-cookie').then(() => {
        api.post('/fortify/login', body)
          .then((res) => {
            if (!res.message && !res.data.two_factor) {
              context.dispatch('login');
            } else {
              context.commit('SET_TWO_FACTOR', res.data.two_factor);
            }
          })
          .finally(() => context.commit('SET_LOADING'));
      });
    },
    login(context) {
      Cookies.set('newsapp_is_user_logged_in', true, { expires: 86400, sameSite: 'lax' });
      context.commit('SET_AUTH', true);
      router.push({ name: 'auth' });
      context.dispatch('fetchUserLogged');
    },
    fetchLogout(context) {
      api.post('/fortify/logout').then(() => context.dispatch('logout'));
    },
    logout(context) {
      context.commit('SET_AUTH', false);
      localStorage.clear();
      Cookies.remove('newsapp_is_user_logged_in', { expires: 86400, sameSite: 'lax' });
      router.push({ name: 'login' });
    },
    async fetchUserLogged(context) {
      const { data } = await api.get('user/logged');
      context.commit('SET_USER', data.data);
    },
    async fetchEditUserProfile(context, profile) {
      context.commit('SET_LOADING');
      const fd = new FormData();
      for (const key in profile) {
        fd.append(key, profile[key]);
      }
      const { data } = await api.post(`user/profile/edit/${profile.id}`, fd);
      if (data) {
        context.commit('SET_USER', data.data);
        context.dispatch('snackbarModule/showSnackbar', { color: 'green', message: 'profile-updated', translate: true }, { root: true });
      }
      context.commit('SET_LOADING');
    },
    setThemeDark(context, theme) {
      context.commit('SET_THEME_DARK', theme);
      localStorage.setItem('newsapp_theme_dark', theme);
    },
    // 2fa
    enable2fa(context, password) {
      api.post('/fortify/user/two-factor-authentication', password)
        .then(async (res) => {
          if (res.status === 200) {
            await context.dispatch('qrCodeAndCodes2fa');
            context.dispatch('dialogModule/showDialog', {
              vToolBar: {
                color: 'grey lighten-3',
                class: 'black--text',
                title: 'lastname',
              },
              width: 500,
              zIndex: 200,
              vCardActions: {
                value: false,
              },
            }, { root: true });
          }
        });
    },
    confirmPassword2fa(context, password) {
      api.post('/fortify/user/confirm-password', password)
        .then(async (res) => {
          if (res.status === 201) {
            await context.dispatch('qrCodeAndCodes2fa');
          }
        });
    },
    async qrCodeAndCodes2fa(context) {
      const resQrCode = await api.get('fortify/user/two-factor-qr-code');
      const resCodes = await api.get('fortify/user/two-factor-recovery-codes');
      context.commit('SET_USER', {
        ...context.getters.getUser,
        qrCode: resQrCode.data.svg,
        recoveryCodes: resCodes.data,
      });
    },
    async disable2fa(context) {
      const oldUser = context.getters.getUser;
      delete oldUser.qrCode;
      delete oldUser.recoveryCodes;
      await api.delete('/fortify/user/two-factor-authentication');
    },
    fetchVerificationCode(context, code) {
      context.commit('SET_LOADING');
      api.post('/fortify/two-factor-challenge', code)
        .then(() => context.dispatch('login'))
        .finally(() => context.commit('SET_LOADING'));
    },
    // 2fa
  },
  mutations: {
    SET_TWO_FACTOR: (state, value) => {
      state.user.twoFactor = value;
      localStorage.setItem('newsapp_two_factor', value);
    },
    SET_USER: (state, user) => {
      state.user.data = user;
      localStorage.setItem('newsapp_user_logged', JSON.stringify(user));
    },
    SET_AUTH: (state, auth) => state.user.auth = auth,
    SET_LOADING: (state) => state.show.loading = !state.show.loading,
  },
};

export default userModule;
