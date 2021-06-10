import { i18n } from '@/plugins/i18n';
import store from '@/store';

export default (to, from, next) => {
  if (store.getters['userModule/getIsUserLoggedIn']) {
    return next({ name: 'auth', params: { locale: i18n.locale } });
  }
  return next();
};
