import { extend } from 'vee-validate';
import { regex } from 'vee-validate/dist/rules';
import UserService from '../../../services/UserService';
import Loading from '../../shared/loading/Loading.vue';
import AreaExternaHeader from '../../AreaExterna/AreaExternaHeader/AreaExternaHeader.vue';

export default {
  name: 'LoginUsuario',
  components: {
    Loading,
    AreaExternaHeader,
  },
  mounted() {
    document.title = 'PUMA | Atualizar Senha';
  },
  data() {
    return {
      userService: new UserService(),
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
  computed: {
    isButtonDisabled() {
      return this.newPassword.length <= 0 && this.confirmNewPassword.length <= 0;
    },
    buttonStatus() {
      return (this.newPassword.length > 0 && this.confirmNewPassword.length > 0) ? 'submit-btn-unlocked' : 'submit-btn';
    },
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
    mostrarOcultarSenha() {
      const senha = document.getElementById('newPassword');
      if (senha.type === 'password') {
        senha.type = 'text';
      } else {
        senha.type = 'password';
      }
    },
    mostrarOcultarRepetirSenha() {
      const senha = document.getElementById('confirmNewPassword');
      if (senha.type === 'password') {
        senha.type = 'text';
      } else {
        senha.type = 'password';
      }
    },
  },
};
extend('regex', {
  // eslint-disable-next-line camelcase
  ...regex,
  message: 'Sua senha deve conter letras, números e caracteres especiais.',
});
