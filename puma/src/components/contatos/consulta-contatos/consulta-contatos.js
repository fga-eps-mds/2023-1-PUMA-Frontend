import ContactService from '../../../services/ContactService';
import ListaConsultaContatos from './lista-consulta-contatos/ListaConsultaContatos.vue';

export default {
  beforeMount() {
    this.getContacts();
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
    contactService: new ContactService(),
  }),

  methods: {
    getContacts() {
      this.$store.commit('OPEN_LOADING_MODAL', { title: 'Carregando...' });
      this.contactService.getContacts().then((response) => {
        this.contacts = response.data;
        this.$store.commit('CLOSE_LOADING_MODAL');
      }).catch(() => {
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('Erro de busca', 'Erro ao recuperar a lista de disciplinas, confira sua conexão com servidor e tente novamente', 'danger');
      });
    },
    makeToast(toastTitle, toastMessage, toastVariant) {
      this.$bvToast.toast(toastMessage, {
        title: toastTitle, variant: toastVariant, solid: true, noAutoHide: 5000,
      });
    },
  },
};
