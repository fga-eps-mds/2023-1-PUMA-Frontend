/* eslint-disable */
/* eslint-disable prefer-destructuring */
import ReturnButton from '../../shared/ReturnButton/ReturnButton.vue';
import ContactService from '../../../services/ContactService';

export default {
  name: 'CadastroContato',
  components: {
    ReturnButton,
  },
  data() {
    return {
      name: '',
      contact: '',
      isLoading: false,
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
    async onSubmit() {
      try {
        const contact = {
          name: this.name,
          email: this.contact
        };
        this.contactService.addContact(contact).then(async () => {
          this.makeToast('Contato cadastrado', `O contato "${contact.name}" foi cadastrado com sucesso`, 'success');
          this.$store.commit('CLOSE_LOADING_MODAL');
        }).catch(() => {
          this.makeToast('Falha ao cadastrar', `Infelizmente houve um erro ao cadastrar o contato "${contact.name}", confira sua conexão com servidor e tente novamente`, 'danger');
          this.$store.commit('CLOSE_LOADING_MODAL');
        });
      } catch (error) {
        this.$store.commit('CLOSE_LOADING_MODAL');
      }
    },
    /* async onSubmit() {
      try {
        const isFormValid = await this.$refs.observer.validate();
        const isMultiselectValid = this.validateMultiselects();
        if (isFormValid && isMultiselectValid) {
          this.$store.commit('OPEN_LOADING_MODAL', { title: 'Enviando...' });
          const userType = {
            userTypeId: this.userTypeId,
            typeName: this.typeName,
            description: this.description,
          };
          if (this.operacao === 'cadastrar') {
            this.isLoading = true;
            this.userService.addUserType(userType).then(async () => {
              this.isLoading = false;
              await this.$router.push({ path: '/tipoUsuario' });
              this.makeToast('SUCESSO', 'Usuário cadastrado com sucesso', 'success');
              this.$store.commit('CLOSE_LOADING_MODAL');
            }).catch((error) => {
              this.isLoading = false;
              this.makeToast('ERRO', 'Infelizmente houve um erro ao cadastrar o usuário', 'danger');
              this.$store.commit('CLOSE_LOADING_MODAL');
            });
          } else if (this.operacao === 'editar') {
            this.isLoading = true;

            this.userService.updateUserType(userType).then(async () => {
              this.isLoading = false;
              await this.$router.push({ path: '/tipoUsuario' });
              this.makeToast('SUCESSO', 'Usuário atualizado com sucesso', 'success');
              this.$store.commit('CLOSE_LOADING_MODAL');
            }).catch((error) => {
              this.isLoading = false;
              this.makeToast('ERRO', 'Infelizmente houve um erro ao atualizar os dados do usuário', 'danger');
              this.$store.commit('CLOSE_LOADING_MODAL');
            });
          }
        }
      } catch (error) {
        this.$store.commit('CLOSE_LOADING_MODAL');
      }
    }, */
    makeToast: function (title, message, variant) {
      this.$bvToast.toast(message, { title: title, variant: variant, solid: true, autoHideDelay: 4000 });
    },
    },

    /* deleteUserType(userTypeId) {
      return new Promise((resolve, reject) => {
        this.userService.getUserType(userTypeId).then((response) => {
          resolve();
          this.$router.push({path: '/tipoUsuario'}).catch(() => {});
        }).catch((error) => {
          this.makeToast('ERRO', 'Infelizmente houve um erro ao recuperar os dados do usuário', 'danger');
          reject();
        });
      });
    }, */
//   },
};
