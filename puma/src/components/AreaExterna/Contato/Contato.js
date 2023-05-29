import AreaExternaHeader from '../AreaExternaHeader/AreaExternaHeader.vue';
import ContactService from '../../../services/ContactService';

export default {
  beforeMount() {
    this.getContacts();
  },

  components: {
    AreaExternaHeader,
  },

  data() {
    return {
      pagina: '/Contato',
      contatos: [
        {
          nome: 'Departamento de Engenharia de Produção',
          endereco: 'Sala DT-77/15, prédio da FT, bloco D UnB - Campus Universitário Darcy Ribeiro, Brasília - DF',
        },
      ],
      contacts: [],
      contactService: new ContactService(),
    };
  },

  methods: {
    getContacts() {
      this.contactService.getContacts().then((response) => {
        this.contacts = response.data;
      }).catch(() => {
      });
    },
  },
};
