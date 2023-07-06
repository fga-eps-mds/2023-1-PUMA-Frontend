/* eslint-disable */
import ReturnButton from '../../shared/ReturnButton/ReturnButton.vue';
import PartnerService from '../../../services/PartnerService';
import UserService from '../../../services/UserService';

export default {
  name: 'EditPartner',
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
    };
  },

  methods: {
    async getProject(){
      this.partnerId = this.$route.params.partnerId;
      await this.PartnerService.getProject(this.partnerId).then((response) => {
      this.name = response.data.response[0]
      this.projectName = this.partner.name
      this.projectDescription = this.partner.projectDescription
      this.partnerImage = this.partner.partnerImage
      this.projectImages = this.partner.projectImages
      }).catch((e) => {
        console.log(e);
      });

    },
    async onSubmit() {
      try {
        const isFormValid = await this.$refs.observer.validate();
        if (!isFormValid) return;

        const project = {
          name: this.name,
          projectName: this.projectName,
          projectDescription: this.projectDescription,
          partnerImage: this.partnerImage,
          projectImages: this.projectImages.join('&-&')
        };
        await this.PartnerService.updateProject(this.partnerId, project)

        this.makeToast('Projeto editado', `O projeto "${project.name}" foi editado com sucesso`, 'success');
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
