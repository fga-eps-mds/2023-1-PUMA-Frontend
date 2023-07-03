/* eslint-disable */
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
