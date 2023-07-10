/* eslint-disable */
import ProjectService from '../../../services/ProjectService';
import PartnerProjectService from '../../../services/PartnerProjectService';
import ReturnButton from '../../shared/ReturnButton/ReturnButton.vue';

export default {
  name: 'CadastroProjeto',
  components: {
    ReturnButton,
  },
  data() {
    return {
      titulo: '',
      descricao: '',
      objetivos: '',
      resultadoEsperado: '',
      formIsValid: '',
      keywords: [],
      mainKeyword: null,
      selectedKeywords: [],
      projectService: new ProjectService(),
      partnerProjectService: new PartnerProjectService(),
      multiSelectPlaceholder: 'Carregando opções...',
      projectImages: [],
      projectImagesUrls: [],
      pdf: '',
      isBestProject: false,
      projects: []
    };
  },
  beforeMount() {
    //this.getProjects();
    
  },
  methods: {
    async onSubmit() {
      try {
        const isFormValid = await this.$refs.observer.validate();
        if (!isFormValid) return;

        this.projects = await this.partnerProjectService.getProjects();
        const bestProjects = await this.howManyBestProjects();
        if (this.isBestProject && bestProjects >= 3) {
          this.makeToast('Falha ao cadastrar projeto', 'Só é possível cadastrar até 3 projetos como melhores projetos', 'danger');
          return;
        }

        const project = {
          title: this.titulo,
          problem: this.descricao,
          expectedResult: this.resultadoEsperado,
          objectives: this.objetivos,
          projectImages: this.projectImagesUrls.join('&-&'),
          projectPdf: this.pdf,
          isBestProject: this.isBestProject
        };
        await this.partnerProjectService.addProject(project)

        this.makeToast('Projeto cadastrado', `O projeto "${project.title}" foi cadastrado com sucesso`, 'success');
      } catch (error) {
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('Falha ao cadastrar projeto', 'Infelizmente houve um erro ao realizar cadastro, confira os dados inseridos e sua conexão com servidor e tente novamente', 'danger');
      }
    },
    async onFileChange(e) {
      console.log(e)
      var selectedFiles = e.target.files;
      console.log(selectedFiles.length)
      for (let i=0; i < selectedFiles.length; i++)
      {
    	  this.getBase64(selectedFiles[i], i);
	  }
    console.log(this.projectImagesUrls)

    },
    async onPDFSubmit(e) {
      console.log(e)
      var pdfFile = e.target.files[0];
      console.log(pdfFile)
      var reader = new FileReader();
      reader.onload = (e) => {
        this.pdf = e.target.result;
      };
      reader.readAsDataURL(pdfFile)
    },
    async getBase64(file, i) {
      console.log(i)
      var reader = new FileReader();
      console.log("file", file)
      reader.onload = (e) => {
        this.projectImagesUrls.push(e.target.result);
      };
      reader.readAsDataURL(file)
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
   }, 

    async howManyBestProjects() {
      console.log(this.projects);
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
      let count = 0;
      for (let i = 0; i < this.projects.length; i += 1) {
        if (this.projects[i].isBestProject) {
          count += 1;
        }
      }
      return count;
    },
   
    removeImage (i) {
      // alert(i);

    	var arrayImages = this.projectImages;
    	var index = arrayImages.indexOf(arrayImages[i]);
		  arrayImages.splice(index, i);
   
    },
    handleChangeKeywords(value) {
      if (!value.find((k) => k.value === this.mainKeyword?.value)) {
        this.mainKeyword = null;
      }
    },
    makeToast(title, message, variant) {
      this.$bvToast.toast(message, {
        title, variant, solid: true, noAutoHide: true, appendToast: true,
      });
    },
    isChecked(option) {
      return this.selectedKeywords.some((op) => op.value === option.value);
    },
    disableForm() {
      const inputs = document.getElementsByTagName('input');
      const textareas = document.getElementsByTagName('textarea');
      for (let i = 0; i < inputs.length; i += 1) { inputs[i].disabled = true; }
      for (let i = 0; i < textareas.length; i += 1) { textareas[i].disabled = true; }
    },
    removeDropdownIcons() {
      document.getElementsByClassName('multiselect__select')[0].remove();
    },
    async getKeywords() {
      try {
        this.$store.commit('OPEN_LOADING_MODAL', { title: 'Carregando...' });

        const response = await this.projectService.getAvailableKeywordsToProject();
        this.keywords = response.data.map((k) => ({ value: k.keywordid, text: k.keyword }))
          .sort((a, b) => a.text.localeCompare(b.text));
        this.multiSelectPlaceholder = this.keywords.length ? 'Selecione' : 'Sem palavras disponíveis';

        this.$store.commit('CLOSE_LOADING_MODAL');
      } catch (error) {
        this.multiSelectPlaceholder = 'Sem palavras disponíveis';
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('Erro de busca', 'Infelizmente houve um erro ao recuperar lista de palavras-chave, confira sua conexão com servidor e tente novamente', 'danger');
      }
    },
    getProject(projectId) {
      this.projectService.getProject(projectId).then((response) => {
        const project = response.data;
        this.selectedKeywords = project.keywords;
        this.titulo = project.name;
        this.descricao = project.problem;
        this.resultadoEsperado = project.expectedresult;
      }).catch(() => {
        this.makeToast('Erro de busca', 'Infelizmente houve um erro ao recuperar projeto, confira sua conexão com servidor e tente novamente', 'danger');
      });
    },
  },
};
