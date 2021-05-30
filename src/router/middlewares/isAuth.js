import VueI18n from '@/plugins/i18n';
import store from '@/store';

export default (to, from, next) => {
  if (store.getters['userModule/getIsUserLoggedIn']) {
    return next({ name: 'auth', params: { locale: VueI18n.locale } });
  }
  return next();
};
