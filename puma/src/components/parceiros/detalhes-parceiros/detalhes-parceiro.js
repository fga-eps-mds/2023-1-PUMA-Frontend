/* eslint-disable */
import ReturnButton from '../../shared/ReturnButton/ReturnButton.vue';
import PartnerService from '../../../services/PartnerService';
import UserService from '../../../services/UserService';

export default {
  name: 'EditPartner',
  components: {
    ReturnButton,
  },
  beforeMount() {   
    this.getPartner();
  },
  data() {
    return {
      imageError: '',
      partnerService: new PartnerService(),
      partnerId: '',
      partner: '',
      name: '',
      partnerDescription: '',
      projectName: '',
      projectDescription: '',
      partnerImage: '',
      projectImages: [],
      imageSelected: '',
      imagesArray: []
    };
  },

  methods: {
    async getPartner(){
      this.partnerId = this.$route.params.id;
      await this.partnerService.getPartner(this.partnerId).then((response) => {
      this.partner = response.data
      this.partnerImage = response.data.partnerImage
      if(this.partner.projectImages.length > 0) {
        this.projectImages = this.partner.projectImages.split("&-&")
        this.imagesArray = this.projectImages
      }
      else {
        this.partner.projectImages = []
      }
      console.log(this.projectImages)
      }).catch((e) => {
        console.log(e);
      });

    },
    async onFileChange(e) {
      var selectedFiles = e.target.files;
      console.log(selectedFiles.length)
      for (let i=0; i < selectedFiles.length; i++)
      {
    	  this.getBase64(selectedFiles[i], i);
	  }

    },
    async onSubmit() {
      try {
        const isFormValid = await this.$refs.observer.validate();
        if (!isFormValid) return;

        const partner = {
          ...this.partner,
          enterpriseLogo: this.partnerImage,  
          projectImages: this.projectImages.join('&-&')
        };
        await this.partnerService.updatePartners(this.partnerId, partner)

        this.makeToast('Projeto editado', `O projeto "${partner.name}" foi editado com sucesso`, 'success');
        this.$router.push({ path: `/parceiros/` });
      } catch (error) {
        this.makeToast('Falha ao editar projeto', 'Infelizmente houve um erro ao atualizar o projeto, confira os dados inseridos e sua conexão com servidor e tente novamente', 'danger');
      }
    },
    async onFileChange(e) {
      var selectedFiles = e.target.files;
      for (let i=0; i < selectedFiles.length; i++)
      {
    	  this.getBase64(selectedFiles[i], i);
	  }

    },
    async getBase64(file, i) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.projectImages.push(e.target.result);
      };
      reader.readAsDataURL(file)
      reader.onerror = function (error) {
        console.log(this.projectImages)
        console.log('Error: ', error);
      };
   }, 

    makeToast(title, message, variant) {
      this.$bvToast.toast(message, {
        title, variant, solid: true, noAutoHide: true, appendToast: true,
      });
    },
    removeImage (i) {
      // alert(i);

    	var arrayImages = this.projectImages;
    	var index = arrayImages.indexOf(arrayImages[i]);
		  arrayImages.splice(index, i);
   
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
    editPartner(id) {
      this.$router.push({ path: `/parceiros/editar/${id}` });
    },
  },
};
