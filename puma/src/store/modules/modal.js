// Button Variants: https://bootstrap-vue.org/docs/components/button#contextual-variants
const getDefaultState = () => ({
  confirmModal: {
    open: false,
    title: '',
    content: '',
    okButton: { text: '', variant: '', onClick: null },
    cancelButton: { text: '', variant: '', onClick: null },
  },
  loadingModal: {
    open: false,
    title: '',
  },
});

export default {
  // namespaced: true,
  state: getDefaultState,
  mutations: {
    OPEN_CONFIRM_MODAL(state, payload) {
      Object.assign(state.confirmModal, { open: true, ...payload });
    },
    CLOSE_CONFIRM_MODAL(state) {
      Object.assign(state.confirmModal, { ...getDefaultState().confirmModal });
    },
    OPEN_LOADING_MODAL(state, payload) {
      Object.assign(state.loadingModal, { open: true, ...payload });
    },
    CLOSE_LOADING_MODAL(state) {
      Object.assign(state.loadingModal, { ...getDefaultState().loadingModal });
    },
  },
  actions: {},
  getters: {
    confirmModal: (state) => state.confirmModal,
    loadingModal: (state) => state.loadingModal,
  },
};
