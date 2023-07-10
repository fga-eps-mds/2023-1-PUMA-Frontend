/* eslint-disable */
import PartnerService from '../../../services/PartnerService';
import ReturnButton from '../../shared/ReturnButton/ReturnButton.vue';

export default {
  name: 'CadastroParceiros',
  components: {
    ReturnButton,
  },
  data() {
    return {
      name: '',
      partnerDescription: '',
      projectName: '',
      projectDescription: '',
      partnerImage: '',
      projectImages: [],
      imageSelected: '',
      partnerService: new PartnerService()
    };
  },
  beforeMount() {
    // this.getKeywords();
  },
  methods: {
    async onSubmit() {
      try {
        const isFormValid = await this.$refs.observer.validate();
        if (!isFormValid) return;

        const project = {
          name: this.name,
          description: this.partnerDescription,
          projectName: this.projectName,
          projectDescription: this.projectDescription,
          enterpriseLogo: this.partnerImage,
          projectImages: this.projectImages.join('&-&')
        };
        await this.partnerService.addPartners(project)

        this.makeToast('Projeto cadastrado', `O projeto "${project.name}" foi cadastrado com sucesso`, 'success');
        this.$router.push({ path: `/parceiros/` });
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
    console.log(this.projectImages);


    },
    async getBase64(file, i) {
      console.log(i)
      var reader = new FileReader();
      console.log("file", file)
      reader.onload = (e) => {
        this.projectImages.push(e.target.result);
      };
      reader.readAsDataURL(file)
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
   }, 
   
    removeImage (i) {
      // alert(i);

    	var arrayImages = this.projectImages;
    	var index = arrayImages.indexOf(arrayImages[i]);
		  arrayImages.splice(index, i);
   
    },
    makeToast(title, message, variant) {
      this.$bvToast.toast(message, {
        title, variant, solid: true, noAutoHide: true, appendToast: true,
      });
    },
    disableForm() {
      const inputs = document.getElementsByTagName('input');
      const textareas = document.getElementsByTagName('textarea');
      for (let i = 0; i < inputs.length; i += 1) { inputs[i].disabled = true; }
      for (let i = 0; i < textareas.length; i += 1) { textareas[i].disabled = true; }
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
    handleImage(input) {
      if (input.files && input.files[0]) {
        if (input.files[0].size > 2000000) {
          this.imageError = true;
          return;
        }
        this.imageError = false;
        const reader = new FileReader();

        reader.onload = (e) => {
          this.partnerImage = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
      }
    },
  },
};
