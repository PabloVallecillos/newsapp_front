const dialogModule = {
  namespaced: true,
  state: {
    dialog: {
      show: false,
      options: {
        vToolBar: {
          color: 'secondary',
          class: 'primary',
          title: 'password',
        },
        width: 290,
        zIndex: 200,
        vCardActions: {
          value: true,
        },
        persistent: true,
      },
    },
  },
  getters: {
    getDialog: (state) => state.dialog,
  },
  actions: {
    showDialog(context, options) {
      context.commit('SET_DIALOG', options);
    },
  },
  mutations: {
    SET_DIALOG: (state, options) => {
      state.dialog.show = true;
      state.dialog.options = options;
    },
  },
};

export default dialogModule;
