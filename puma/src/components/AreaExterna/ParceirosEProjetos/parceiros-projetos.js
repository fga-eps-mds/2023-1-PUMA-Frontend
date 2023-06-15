/* eslint-disable*/
import PartnerProjectService from '../../../services/PartnerProjectService';
import AreaExternaHeader from '../AreaExternaHeader/AreaExternaHeader.vue';

export default {
  components: {
    AreaExternaHeader,
  },
  beforeMount() {
    this.getProjects();
  },
  data() {
    return {
      partnerProjectService: new PartnerProjectService(),
      projects: '',
      currentProject: '',
      currentProjectImages: []
    }
  },
  methods: {
    async getProjects(){
      await this.partnerProjectService.getProjects().then((response) => {
        this.projects = response.data.response;
        this.currentProject = response.data.response[0];
        this.projects.forEach(element => {
          element.newImages = element.projectImages.split('&-&')
        });
        console.log(this.projects)
      }).catch(() => {
        this.makeToast('Erro de busca', 'Infelizmente houve um erro ao recuperar os projetos, confira sua conexão com servidor e tente novamente', 'danger');
      });
    },
    async onCardClick(id) {
      this.currentProjectImages = []
      await this.partnerProjectService.getProject(id).then((response) => {
        this.currentProject = response.data.response[0];
        let images = this.currentProject.projectImages.split("&-&")
        images.forEach(element => {
          this.currentProjectImages.push(element)
        });
        console.log("Images", this.currentProjectImages)
      }).catch(() => {
        this.makeToast('Erro de busca', 'Infelizmente houve um erro ao recuperar os projetos, confira sua conexão com servidor e tente novamente', 'danger');
      });
    }
  }
};
