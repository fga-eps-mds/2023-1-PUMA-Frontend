import ReturnButton from '../../shared/ReturnButton/ReturnButton.vue';
import PumaInfoService from '../../../services/PumaInfoService';
import UserService from '../../../services/UserService';

export default {
  name: 'CadastroPartner',
  components: {
    ReturnButton,
  },
  data() {
    return {
      images: [
        { id: 2, url: '../../../assets/imagemTemporaria.png', description: 'Image 2' },
        { id: 1, url: '../../../assets/imagemTemporaria.png', description: 'Image 1' },
        { id: 3, url: '../../../assets/imagemTemporaria.png', description: 'Image 3' },
      ],
      name: '',
      cnpj: '',
      enterpriseLogo: '',
      socialReason: '',
    };
  },
  async mounted() {
    try {
      await this.getProfessors();
      console.log(this.professors);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
  },
};
