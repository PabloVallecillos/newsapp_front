import VueI18n from '@/plugins/i18n';

export default (to, from, next) => {
  const { locale } = to.params;
  const supportedLocales = Object.keys(VueI18n.messages);
  if (!supportedLocales.includes(locale)) return next(VueI18n.locale);
  VueI18n.locale = locale;
  return next();
};
