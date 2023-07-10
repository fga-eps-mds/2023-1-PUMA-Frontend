/* eslint-disable*/
import PartnerProjectService from '../../../services/PartnerProjectService';
import AreaExternaHeader from '../AreaExternaHeader/AreaExternaHeader.vue';

export default {
  components: {
    AreaExternaHeader,
  },
  beforeMount() {
    this.onQuery();
    this.getProjects();
  },

  watch: {
    projectsSearch() {
      this.filterProjects();
    }
  },
  data() {
    return {
      partnerProjectService: new PartnerProjectService(),
      projects: [],
      currentProject: '',
      currentProjectImages: [],
      projectsSearch: '',
      filteredProjects: [],
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
        this.filteredProjects = JSON.parse(JSON.stringify(this.projects));
        console.log(this.projects)
      }).catch(() => {
        this.makeToast('Erro de busca', 'Infelizmente houve um erro ao recuperar os projetos, confira sua conexão com servidor e tente novamente', 'danger');
      });
    },

    sortProjectNames() {
      this.filteredProjects.sort((a, b) => a.title.localeCompare(b.title));
    },

    filterProjects() {
      if (!this.projectsSearch) {
        this.filteredProjects = this.projects;
        this.sortProjectNames();
      } else {
        this.filteredProjects = this.projects.filter(project =>
          project.title.toLowerCase().includes(this.projectsSearch.toLowerCase())
        );
      }
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
    },
    async onQuery() {
      const id = this.$route.query.pId;
      if (id) {
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
  }
};
