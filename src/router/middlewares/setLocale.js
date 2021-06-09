import { i18n } from '@/plugins/i18n';

export default (to, from, next) => {
  const { locale } = to.params;
  const supportedLocales = Object.keys(i18n.messages);
  if (!supportedLocales.includes(locale)) return next(i18n.locale);
  i18n.locale = locale;
  return next();
};
