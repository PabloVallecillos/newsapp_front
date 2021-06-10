import { i18n } from '@/plugins/i18n';

export default function auth({ next, store }) {
  if (!store.getters['userModule/getIsUserLoggedIn']) {
    return next({ name: 'login', params: { locale: i18n.locale } });
  }
  return next();
}
