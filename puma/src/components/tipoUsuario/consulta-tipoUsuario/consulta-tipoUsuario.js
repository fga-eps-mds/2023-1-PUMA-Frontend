import ListaConsultaTipoUsuario from './ListaConsultaTipoUsuario/ListaConsultaTipoUsuario.vue';

export default {
  beforeMount() {
    this.getUserTypes();
  },

  components: {
    ListaConsultaTipoUsuario,
  },

  data: () => ({
    isLoading: false,
    userTypes: [],
  }),

  methods: {
    makeToast(toastTitle, toastMessage, toastVariant) {
      this.$bvToast.toast(toastMessage, {
        title: toastTitle, variant: toastVariant, solid: true, autoHideDelay: 4000,
      });
    },
  },
};
