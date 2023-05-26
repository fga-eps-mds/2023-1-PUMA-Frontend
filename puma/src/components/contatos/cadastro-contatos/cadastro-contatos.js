/* eslint-disable */
/* eslint-disable prefer-destructuring */
import ReturnButton from '../../shared/ReturnButton/ReturnButton.vue';
import ContactService from '../../../services/ContactService';

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
      id: '',
      name: '',
      contact: '',
      buttonLabel: '',
      isLoading: false,
      isEditing: false,
      operacao: this.$route.path.split('/', 3)[2],
      contactService: new ContactService(),
    };
  },
  async mounted() {
    try {
      this.$store.commit('OPEN_LOADING_MODAL', { title: 'Carregando...' });
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
    handleClick() {
      if (this.isEditing) {
        this.onUpdate();
      } else {
        this.onSubmit();
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
        this.$router.go(-1);
      } catch (error) {
        this.makeToast('Falha ao cadastrar', `Infelizmente houve um erro ao cadastrar o contato "${error}", confira sua conexão com servidor e tente novamente`, 'danger');
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
        }).catch((error) => {
          this.makeToast('Contato atualizado', `O contato "${error}" foi atualizado com sucesso`, 'success');
        });
      } catch (error) {
        this.makeToast('Falha ao atualizar', `Infelizmente houve um erro ao atualizar o contato "${contact.name}", confira sua conexão com servidor e tente novamente`, 'danger');
      };
    },
  },
};
