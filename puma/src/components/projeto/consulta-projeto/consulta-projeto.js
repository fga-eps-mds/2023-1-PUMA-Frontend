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
        this.makeToast('ERRO', 'Erro ao recuperar projetos', 'danger');
      });
    },

    makeToast: function (title, message, variant) {
      this.$bvToast.toast(message, { title: title, variant: variant, solid: true, autoHideDelay: 4000 });
    },
  },
};