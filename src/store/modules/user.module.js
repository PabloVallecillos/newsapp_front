import api from '@/utils/requests/api';
import router from '@/router';
import Cookies from 'js-cookie';
import VueI18n from '@/plugins/i18n';
import { i18n } from '../../plugins/i18n';

const userModule = {
  namespaced: true,
  state: {
    user: {
      auth: null,
      twoFactor: false,
      data: null,
      themeDark: false,
      check: {
        username: false,
        email: false,
      },
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
    getCheck: (state) => state.user.check,
    getIs2fa: (state) => state.user.twoFactor ?? localStorage.getItem('newsapp_two_factor') === 'true',
    getIsUserLoggedIn: (state) => state.user.auth ?? !!Cookies.get('newsapp_is_user_logged_in'),
    getLoading: (state) => state.show.loading,
    getUrlLoginFacebook: () => `${process.env.VUE_APP_API_URL}/es/user/register/facebook?XDEBUG_SESSION_START=PHPSTORM`,
    getUrlLoginGoogle: () => `${process.env.VUE_APP_API_URL}/es/user/register/google?XDEBUG_SESSION_START=PHPSTORM`,
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
      for (let i = 0; i < localStorage.length; i += 1) {
        const keyString = localStorage.key(i);
        if (keyString !== 'newsapp_theme_dark' && keyString !== 'newsapp_two_factor') {
          localStorage.removeItem(keyString);
        }
      }
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
        context.dispatch('snackbarModule/showSnackbar', { color: 'green', message: i18n.t('profile-updated') }, { root: true });
      }
      context.commit('SET_LOADING');
    },
    setThemeDark(context, theme) {
      context.commit('SET_THEME_DARK', theme);
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
                title: i18n.t('2fa-activate'),
              },
              width: 500,
              zIndex: 200,
              vCardActions: {
                value: false,
              },
            }, { root: true });
            context.commit('SET_TWO_FACTOR', true);
          }
        });
    },
    confirmPassword2fa(context, password) {
      api.post('/fortify/user/confirm-password', password)
        .then(async (res) => {
          if (res.status === 201) {
            await context.dispatch('enable2fa');
          }
        });
    },
    async qrCodeAndCodes2fa(context) {
      const resQrCode = await api.get('fortify/user/two-factor-qr-code');
      const resCodes = await api.get('fortify/user/two-factor-recovery-codes');
      const qrCode = resQrCode.data.svg; // .replace('fill="#2d3748"', 'fill="#fcb74d"');
      context.commit('SET_USER', {
        ...context.getters.getUser,
        qrCode,
        recoveryCodes: resCodes.data,
      });
    },
    async disable2fa(context) {
      localStorage.removeItem('newsapp_user_logged');
      await context.dispatch('fetchUserLogged');
      await api.delete('/fortify/user/two-factor-authentication');
      context.commit('SET_TWO_FACTOR', false);
    },
    fetchVerificationCode(context, code) {
      context.commit('SET_LOADING');
      api.post('/fortify/two-factor-challenge', code)
        .then((res) => {
          if (res?.status === 204 || res?.status === 302) context.dispatch('login');
        }).finally(() => context.commit('SET_LOADING'));
    },
    // 2fa
    // register
    fetchRegister(context, params) {
      context.commit('SET_LOADING');
      api.get('/sanctum/csrf-cookie').then(async () => {
        const res = await api.post('/fortify/register', params).finally(() => context.commit('SET_LOADING'));
        if (res.status === 201) {
          router.push({ name: 'login' });
          setTimeout(() => {
            context.dispatch('snackbarModule/showSnackbar', { color: 'green', message: i18n.t('user-register', { user: params.username }) }, { root: true });
          }, 700);
        }
      });
    },
    async fetchCheckField(context, params) {
      const { data } = await api.post('/user/check/field', params);
      if (params.username) context.commit('SET_CHECK_USERNAME', data.data);
      else if (params.email) context.commit('SET_CHECK_EMAIL', data.data);
    },
    // register
    async csrfCookie() {
      await api.get('/sanctum/csrf-cookie');
    },
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
    SET_CHECK_USERNAME: (state, username) => state.user.check.username = username,
    SET_CHECK_EMAIL: (state, email) => state.user.check.email = email,
    SET_THEME_DARK: (state, value) => {
      localStorage.setItem('newsapp_theme_dark', value);
    },
    SET_AUTH: (state, auth) => state.user.auth = auth,
    SET_LOADING: (state) => state.show.loading = !state.show.loading,
  },
};

export default userModule;
