/* eslint-disable*/
import PartnerProjectService from '../../../services/PartnerProjectService';

export default {
  name: 'MelhoresProjetos',
  data() {
    return {
      partnerProjectService: new PartnerProjectService(),
      projects: '',
      bestProjects: '',
      currentProject: '',
      currentProjectImages: []
    };
  },

  beforeMount() {
    this.getProjects();
    this.getBestProjects();
  },

  methods: {
    async getProjects() {
      await this.partnerProjectService.getProjects().then((response) => {
        this.projects = response.data.response;
        this.currentProject = response.data.response[0];
        this.projects.forEach(element => {
          element.newImages = element.projectImages.split('&-&')
        });
        console.log(this.projects);
      }).catch(() => {
        this.makeToast('Erro de busca', 'Infelizmente houve um erro ao recuperar os projetos, confira sua conexão com servidor e tente novamente', 'danger');
      });
    },
    async onCardClick(id) {
        window.location.href = `http://localhost:8080/home/parceiros/?pId=${id}`;
      }
  },
};
