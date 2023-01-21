/* eslint-disable*/
import ProjectService from '../../../services/ProjectService';
import ListaConsultaProjeto from './ListaConsultaProjeto/ListaConsultaProjeto.vue';

export default {
  name: 'ConsultaProjetos',

  components: {
    ListaConsultaProjeto,
  },

  data() {
    return {
      projectSearch: null,
      operacao: null,
      isLoading: false,
      wasLoaded: false,
      projects: [],
      projectService: new ProjectService(),
    };
  },
  
  beforeMount() {
    this.getProjects();
  },

  watch: {
    '$route.path'() {
      this.projectSearch = null;
      this.getProjects();
    }
  },

  methods: {
    getProjects() {
      this.operacao = this.$route.path.slice(1);
      let user = this.$store.getters.user;
      user.operation = this.operacao;

      this.$store.commit('OPEN_LOADING_MODAL', { title: 'Carregando...' });
      this.projectService.getMyProposals(user).then((response) => {
        this.projects = response.data;

        this.$store.commit('CLOSE_LOADING_MODAL');
      }).catch(() => {
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('Erro de busca', 'Infelizmente houve um erro ao recuperar lista de projetos, confira sua conexão com servidor e tente novamente', 'danger');
      });
    },

    makeToast: function (title, message, variant) {
      this.$bvToast.toast(message, { title: title, variant: variant, solid: true, noAutoHide: true, appendToast: true });
    },
  },
};