/* eslint-disable */
/* eslint-disable prefer-destructuring */
import ReturnButton from '../../shared/ReturnButton/ReturnButton.vue';
import ContactService from '../../../services/ContactService';
import SubjectService from '../../../services/SubjectService';

export default {
  beforeMount() {
    this.onAppear();
  },
  name: 'CadastroContato',
  components: {
    ReturnButton,
  },
  data() {
    return {
      name: '',
      contact: '',
      buttonLabel: '',
      professorFullName: '',
      isLoading: false,
      isEditing: false,
      contactService: new ContactService(),
      subjectService: new SubjectService(),
      professors: [],
      contacts: [],
      selectedContact: {},
      operacao: this.$route.path.split('/', 3)[2],
    };
  },
  async mounted() {
    try {
      this.$store.commit('OPEN_LOADING_MODAL', { title: 'Carregando...' });
      await this.getProfessors();
      await this.getContacts();
      if(this.operacao === 'visualizar') {
        this.findSelectedContact();
      }
      this.$store.commit('CLOSE_LOADING_MODAL');
    } catch (error) {
      this.$store.commit('CLOSE_LOADING_MODAL');
    }
  },
  methods: {
    onAppear() {
      if (this.$route.params.isEditing) {
        this.id = this.$route.params.id;
        this.name = this.$route.params.name;
        this.contact = this.$route.params.contact;
        this.isEditing = this.$route.params.isEditing;
        this.buttonLabel = 'Editar contato';
      } else {
        this.buttonLabel = 'Cadastrar contato';
      }
    },
    async handleClick() {
      if (this.isEditing) {
        await this.onUpdate();
      } else {
        await this.onSubmit();
      }
    },
    async onSubmit() {
      try {
        const contact = {
          name: this.name,
          email: this.contact
        };
        this.contactService.addContact(contact).then(async () => {
          this.makeToast('Contato cadastrado', `O contato "${contact.name}" foi cadastrado com sucesso`, 'success');
          this.buttonLabel = 'Editar contato'
          this.$store.commit('CLOSE_LOADING_MODAL');
          await this.$router.push({ name: 'Informações de contato' });
        }).catch(() => {
          this.makeToast('Falha ao cadastrar', `Infelizmente houve um erro ao cadastrar o contato "${contact.name}", confira sua conexão com servidor e tente novamente`, 'danger');
          this.$store.commit('CLOSE_LOADING_MODAL');
        });
      } catch (error) {
        this.$store.commit('CLOSE_LOADING_MODAL');
      }
    },
    makeToast: function (title, message, variant) {
      this.$bvToast.toast(message, { title: title, variant: variant, solid: true, autoHideDelay: 4000 });
    },
    async deleteContact() {
      try {
        await this.contactService.deleteContact(this.$route.params.id);
        await this.$router.push({ name: 'Informações de contato' });
      } catch (error) {
        this.makeToast('Falha ao cadastrar', `Infelizmente houve um erro ao deletar o contato "${error}", confira sua conexão com servidor e tente novamente`, 'danger');
        this.$store.commit('CLOSE_LOADING_MODAL');
      }
    },
    async onUpdate() {
      try {
        const contactItem = {
          name: this.name,
          email: this.contact,
        };
        this.contactService.updateContact(this.id, contactItem).then(async () => {
          this.makeToast('Contato atualizado', `O contato "${this.name}" foi atualizado com sucesso`, 'success');
        await this.$router.push({ name: 'Informações de contato' });
        }).catch((error) => {
          this.makeToast('Contato atualizado', `O contato "${error}" foi atualizado com sucesso`, 'success');
        });
      } catch (error) {
        this.makeToast('Falha ao atualizar', `Infelizmente houve um erro ao atualizar o contato "${contact.name}", confira sua conexão com servidor e tente novamente`, 'danger');
      };
    },
    getProfessors() {
      this.isLoadingProfessors = true;
      return new Promise((resolve, reject) => {
        this.subjectService.getProfessors().then((response) => {
          this.professors = response.data;
          resolve();
        }).catch(() => {
          this.makeToast('Erro de busca', 'Infelizmente houve um erro ao recuperar a lista de professores disponíveis, confira sua conexão com servidor e tente novamente', 'danger');
          reject();
        });
      });
    },
    getContacts() {
      return new Promise((resolve, reject) => {
        this.contactService.getContacts().then((response) => {
          this.contacts = response.data;
          resolve();
        }).catch(() => {
          this.makeToast('Erro de busca', 'Infelizmente houve um erro ao recuperar a lista de professores disponíveis, confira sua conexão com servidor e tente novamente', 'danger');
          reject();
        });
      });
    },
    findSelectedContact() {
      this.selectedContact = this.contacts.filter(item => item.contactId === parseInt(this.$route.params.id));

      this.name = this.selectedContact[0].name;
      this.contact = this.selectedContact[0].email;
    },
  },
};
