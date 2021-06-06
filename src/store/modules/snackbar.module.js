const snackbarModule = {
  namespaced: true,
  state: {
    snackbar: {
      show: false,
      color: 'green',
      message: '',
      translate: false,
    },
  },
  getters: {
    getSnackbar: (state) => state.snackbar,
  },
  actions: {
    showSnackbar(context, { color, message, translate }) {
      context.commit('SET_SNACKBAR', { color, message, translate });
    },
  },
  mutations: {
    SET_SNACKBAR: (state, { color, message, translate }) => {
      state.snackbar.show = true;
      state.snackbar.color = color;
      state.snackbar.message = message;
      state.snackbar.translate = translate;
    },
  },
};

export default snackbarModule;
