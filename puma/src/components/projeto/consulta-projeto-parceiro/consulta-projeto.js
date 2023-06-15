/* eslint-disable*/
import ReturnButton from '../../shared/ReturnButton/ReturnButton.vue';
import PartnerProjectService from '../../../services/PartnerProjectService';

export default {
  // mixins: [statusProjetoEnum],

  // props: {
  //   operacao: String,
  //   dataProjects: Array,
  //   projectSearch: String,
  // },
  components: {
    ReturnButton,
  },
  
  beforeMount() {
    this.getProjects();
  },
  
  data: () => ({
    listProjects: [],
    projectService: new PartnerProjectService(),
  }),
  // watch: {
  //   dataProjects() {
  //     this.listProjects = this.dataProjects;
  //   },

  //   projectSearch() {
  //     if (this.projectSearch) {
  //       this.listProjects = this.dataProjects.filter((item) => (
  //         item.name.toLowerCase().includes(this.projectSearch.toLowerCase())));
  //     } else {
  //       this.listProjects = this.dataProjects;
  //     }
  //   },
  // },

  methods: {
    goToProject(id) {
      this.$router.push({ path: `/projetos-parceiros/visualizar/${id}` });
    },
    async deleteProject(id) {
      await this.projectService.deleteProject(id).then((response) => {
        this.makeToast('Deletado com sucesso', 'success');
      }).catch((e) => {
        console.log(e)
        this.makeToast('Erro de busca', 'Infelizmente houve um erro ao recuperar lista de projetos, confira sua conexão com servidor e tente novamente', 'danger');
      });
     this.$router.go()
    },
    makeToast(title, message, variant) {
      this.$bvToast.toast(message, {
        title, variant, solid: true, noAutoHide: true, appendToast: true,
      });
    },
    getProjects() {
      this.projectService.getProjects().then((response) => {
        this.listProjects = response.data.response;
      }).catch((e) => {
        console.log("error getprojects", e)
        this.makeToast('Erro de busca', 'Infelizmente houve um erro ao recuperar lista de projetos, confira sua conexão com servidor e tente novamente', 'danger');
      });
    }
  },
};
