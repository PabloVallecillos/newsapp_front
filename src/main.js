import Vue from 'vue';
import snackbar from '@/components/snackbar/snackbar.vue';
import dialog from '@/components/dialog/dialog.vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import i18n from './plugins/i18n';
import api from './utils/requests/api';
import handleResponseError from '@/utils/requests/handleResponseError';

Vue.config.productionTip = false;
// global methods
Vue.prototype.$http = api;
Vue.prototype.$handleResponseErrors = handleResponseError;
// global components
Vue.component('snackbar', snackbar);
Vue.component('dialog-custom', dialog);

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
