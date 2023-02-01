/* eslint-disable */
/* eslint-disable prefer-destructuring */
import UserService from '../../../services/UserService';
import ReturnButton from '../../shared/ReturnButton/ReturnButton.vue';

export default {
  name: 'CadastroUsuario',
  components: {
    ReturnButton,
  },
  data() {
    return {
      userTypeId: this.$route.params.id,
      typeName: '',
      description: '',
      isLoading: false,
      operacao: this.$route.path.split('/', 3)[2],
      userService: new UserService(),
    };
  },
  async mounted() {
    try {
      this.$store.commit('OPEN_LOADING_MODAL', { title: 'Carregando...' });
      this.getUserType(this.userTypeId);
      this.$store.commit('CLOSE_LOADING_MODAL');
    } catch (error) {
      this.$store.commit('CLOSE_LOADING_MODAL');
    }
  },
  methods: {
    async onSubmit() {
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
    },
    makeToast: function (title, message, variant) {
      this.$bvToast.toast(message, { title: title, variant: variant, solid: true, autoHideDelay: 4000 });
    },

    getUserType(userTypeId) {
      return new Promise((resolve, reject) => {
        this.userService.getUserType(userTypeId).then((response) => {
          const userType = response.data;
          this.typeName = userType.userType.typeName;
          this.description = userType.userType.description;
          resolve();
        }).catch((error) => {
          this.makeToast('ERRO', 'Infelizmente houve um erro ao recuperar os dados do usuário', 'danger');
          reject();
        });
      });
    },

    deleteUserType(userTypeId) {
      return new Promise((resolve, reject) => {
        this.userService.getUserType(userTypeId).then((response) => {
          resolve();
          this.$router.push({path: '/tipoUsuario'}).catch(() => {});
        }).catch((error) => {
          this.makeToast('ERRO', 'Infelizmente houve um erro ao recuperar os dados do usuário', 'danger');
          reject();
        });
      });
    },
  },
};
