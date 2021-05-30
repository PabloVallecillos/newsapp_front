import VueI18n from '@/plugins/i18n';

export default function auth({ next, store }) {
  if (!store.getters['userModule/getIsUserLoggedIn']) {
    return next({ name: 'login', params: { locale: VueI18n.locale } });
  }
  return next();
}
