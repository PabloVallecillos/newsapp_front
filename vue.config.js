const fs = require('fs');

const devServer = {};

if (fs.existsSync(process.env.VUE_APP_SSL_CRT_PATH)) {
  devServer.cert = fs.readFileSync(process.env.VUE_APP_SSL_CRT_PATH);
}

if (fs.existsSync(process.env.VUE_APP_SSL_KEY_PATH)) {
  devServer.key = fs.readFileSync(process.env.VUE_APP_SSL_KEY_PATH);
}

if (devServer.cert && devServer.key) {
  devServer.host = process.env.VUE_APP_DEV_HOST;
  devServer.https = true;
}

module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  transpileDependencies: [
    'vuetify',
  ],

  pluginOptions: {
    i18n: {
      locale: 'es',
      fallbackLocale: 'es',
      localeDir: 'plugins/i18n/locales',
      enableInSFC: true,
    },
  },
  devServer,
};
