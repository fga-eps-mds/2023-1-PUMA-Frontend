import UserService from '../../../services/UserService';
import ListaConsultaUsuario from './ListaConsultaTipoUsuario/ListaConsultaTipoUsuario.vue';

export default {
  beforeMount() {
    this.getUserTypes();
  },

  components: {
    ListaConsultaUsuario,
  },

  data: () => ({
    userTypeSearch: null,
    isLoading: false,
    wasLoaded: false,
    isDeletingUserType: false,
    userTypes: [],
    myUserTypes: [],
    userService: new UserService(),
  }),

  methods: {
    getUserTypes() {
      this.$store.commit('OPEN_LOADING_MODAL', { title: 'Carregando...' });
      this.userService.getUserType().then((response) => {
        this.userTypes = response.data;
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.separateUserTypes();
      }).catch(() => {
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('ERRO', 'Erro ao recuperar usuarios', 'danger');
      });
    },
    makeToast(toastTitle, toastMessage, toastVariant) {
      this.$bvToast.toast(toastMessage, {
        title: toastTitle, variant: toastVariant, solid: true, autoHideDelay: 4000,
      });
    },
  },
};
