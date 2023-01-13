import { extend } from 'vee-validate';
import { regex } from 'vee-validate/dist/rules';
import UserService from '../../../services/UserService';
import Loading from '../../shared/loading/Loading.vue';
import VisitorNav from '../../VisitorNav/VisitorNav.vue';

export default {
  name: 'LoginUsuario',
  components: {
    Loading,
    VisitorNav,
  },
  mounted() {
    document.title = 'PUMA | Atualizar Senha';
  },
  data() {
    return {
      userService: new UserService(),
      email: '',
      newPassword: '',
      confirmNewPassword: '',
      isLoading: false,
      isEqualsToNewPassword: true,
      passwordRedefined: false,
      navs: [{ title: 'Home' }, { title: 'Recuperação de Senha' }],
    };
  },
  created() {
    this.email = localStorage.email;
  },

  methods: {
    verifyConfirmPassword() {
      this.isEqualsToNewPassword = this.confirmNewPassword === this.newPassword;
    },
    async updatePassword() {
      const isValid = await this.$refs.observer.validate();

      if (isValid && this.isEqualsToNewPassword === true && this.newPassword.length > 0) {
        this.userService.updatePassword(this.email, this.newPassword, (res) => {
          if (res.status === 200) {
            this.passwordRedefined = true;
          }
        });
      }
    },
  },
};
extend('regex', {
  // eslint-disable-next-line camelcase
  ...regex,
  message: 'Para uma senha mais segura utilize a combinação de letras e numeros.',
});
