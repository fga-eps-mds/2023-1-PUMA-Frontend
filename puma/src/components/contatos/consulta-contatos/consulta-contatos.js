import ListaConsultaContatos from './lista-consulta-contatos/ListaConsultaContatos.vue';

export default {
  beforeMount() {
    this.getSubjects();
  },

  components: {
    ListaConsultaContatos,
  },

  data: () => ({
    contactsSearch: null,
    isLoading: false,
    wasLoaded: false,
    isDeletingContact: false,
    contacts: [],
  }),

  methods: {
    makeToast(toastTitle, toastMessage, toastVariant) {
      this.$bvToast.toast(toastMessage, {
        title: toastTitle, variant: toastVariant, solid: true, noAutoHide: 5000,
      });
    },
  },
};
