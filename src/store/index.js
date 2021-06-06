import Vue from 'vue';
import Vuex from 'vuex';
import userModule from '@/store/modules/user.module';
import snackbarModule from '@/store/modules/snackbar.module';
import dialogModule from '@/store/modules/dialog.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userModule,
    snackbarModule,
    dialogModule,
  },
});
