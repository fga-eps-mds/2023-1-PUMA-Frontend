/* eslint-disable */
/* eslint-disable prefer-destructuring */
import UserService from '../../../services/UserService';
import ReturnButton from '../../shared/ReturnButton/ReturnButton.vue';

export default {
  name: 'CadastroPerfil',
  components: {
    ReturnButton,
  },
  data() {
    return {
      userTypeId: this.$route.params.id,
      typeName: '',
      canEditExternalEnvironment: false,
      canCreateDiscipline: false,
      canAcceptTeacher: false,
      canRevokeUserType: false,
      canGiveUserType: false,
      canEditPermission: false,
      canDeleteUserType: false,
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
        if (isFormValid) {
          this.$store.commit('OPEN_LOADING_MODAL', { title: 'Enviando...' });
          const userType = {
            userTypeId: this.userTypeId,
            typeName: this.typeName,
            canEditExternalEnvironment: this.canEditExternalEnvironment,
            canCreateDiscipline: this.canCreateDiscipline,
            canAcceptTeacher: this.canAcceptTeacher,
            canRevokeUserType: this.canRevokeUserType,
            canGiveUserType: this.canGiveUserType,
            canEditPermission: this.canEditPermission,
            canDeleteUserType: this.canDeleteUserType,
          };
          if (this.operacao === 'cadastrar') {
            this.isLoading = true;
            this.userService.addUserType(userType).then(async () => {
              this.isLoading = false;
              await this.$router.push({ path: '/tipoUsuario' });
              this.makeToast('SUCESSO', 'Perfil cadastrado com sucesso', 'success');
              this.$store.commit('CLOSE_LOADING_MODAL');
            }).catch((error) => {
              this.isLoading = false;
              this.makeToast('ERRO', 'Infelizmente houve um erro ao cadastrar o perfil', 'danger');
              this.$store.commit('CLOSE_LOADING_MODAL');
            });
          } else if (this.operacao === 'editar') {
            this.isLoading = true;

            this.userService.updateUserType(userType).then(async () => {
              this.isLoading = false;
              await this.$router.push({ path: '/tipoUsuario' });
              this.makeToast('SUCESSO', 'Perfil atualizado com sucesso', 'success');
              this.$store.commit('CLOSE_LOADING_MODAL');
            }).catch((error) => {
              this.isLoading = false;
              this.makeToast('ERRO', 'Infelizmente houve um erro ao atualizar os dados do perfil', 'danger');
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
          this.typeName = userType.typeName;
          this.canEditExternalEnvironment = userType.canEditExternalEnvironment;
          this.canCreateDiscipline = userType.canCreateDiscipline;
          this.canAcceptTeacher = userType.canAcceptTeacher;
          this.canRevokeUserType = userType.canRevokeUserType;
          this.canGiveUserType = userType.canGiveUserType;
          this.canEditPermission = userType.canEditPermission;
          this.canDeleteUserType = userType.canDeleteUserType;
          resolve();
        }).catch((error) => {
          this.makeToast('ERRO', 'Infelizmente houve um erro ao recuperar os dados do perfil', 'danger');
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
          this.makeToast('ERRO', 'Infelizmente houve um erro ao recuperar os dados do perfil', 'danger');
          reject();
        });
      });
    },
  },
};
