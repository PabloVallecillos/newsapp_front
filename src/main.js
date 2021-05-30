import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import i18n from './plugins/i18n';
import api from './utils/requests/api';

Vue.config.productionTip = false;
Vue.prototype.$http = api;

Vue.prototype.$handleResponseErrors = (err) => {
  let msg = '';
  if (typeof err === 'object' && err !== null) {
    Object.values(err).forEach((e) => {
      msg += `${e}<br/>`;
    });
  } else if (err && Array.isArray(err)) {
    err.forEach((e) => {
      msg += `${e}<br/>`;
    });
  } else {
    console.error(err);
    msg = err;
  }
  return msg;
};

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
