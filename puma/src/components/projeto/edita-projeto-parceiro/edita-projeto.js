/* eslint-disable */
import PartnerProjectService from '../../../services/PartnerProjectService';
import ReturnButton from '../../shared/ReturnButton/ReturnButton.vue';

export default {
  name: 'EditaProjeto',
  components: {
    ReturnButton,
  },
  beforeMount() {
    console.log("beforemount"),
    this.getProject();
  },
  data() {
    return {
      id: '',
      titulo: '',
      descricao: '',
      objetivos: '',
      resultadoEsperado: '',
      formIsValid: '',
      partnerProjectService: new PartnerProjectService(),
      projectImages: [],
      projectImagesUrls: [],
      pdf: '',
      project: ''
    };
  },
  methods: {
    async getProject(){
      this.id = this.$route.params.id;
      await this.partnerProjectService.getProject(this.id).then((response) => {
      this.project = response.data.response[0]
      this.titulo = this.project.title
      this.descricao = this.project.problem
      this.objetivos = this.project.objectives
      this.resultadoEsperado = this.project.expectedResult
      }).catch((e) => {
        console.log(e);
      });

    },
    async onSubmit() {
      try {
        const isFormValid = await this.$refs.observer.validate();
        if (!isFormValid) return;

        const project = {
          title: this.titulo,
          problem: this.descricao,
          expectedResult: this.resultadoEsperado,
          objectives: this.objetivos,
          projectImages: this.projectImagesUrls.join('&-&'),
          projectPdf: this.pdf
        };
        await this.partnerProjectService.updateProject(this.id, project)

        this.makeToast('Projeto editado', `O projeto "${project.title}" foi editado com sucesso`, 'success');
      } catch (error) {
        this.makeToast('Falha ao editar projeto', 'Infelizmente houve um erro ao atualizar o projeto, confira os dados inseridos e sua conexão com servidor e tente novamente', 'danger');
      }
      this.$router.push({ path: `/projetos-parceiros/` });
    },
    async onFileChange(e) {
      var selectedFiles = e.target.files;
      for (let i=0; i < selectedFiles.length; i++)
      {
    	  this.getBase64(selectedFiles[i], i);
	  }

    },
    async onPDFSubmit(e) {
      console.log(e)
      var pdfFile = e.target.files[0];
      var reader = new FileReader();
      reader.onload = (e) => {
        this.pdf = e.target.result;
      };
      reader.readAsDataURL(pdfFile)
    },
    async getBase64(file, i) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.projectImagesUrls.push(e.target.result);
      };
      reader.readAsDataURL(file)
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
   }, 

    makeToast(title, message, variant) {
      this.$bvToast.toast(message, {
        title, variant, solid: true, noAutoHide: true, appendToast: true,
      });
    },
  },
};