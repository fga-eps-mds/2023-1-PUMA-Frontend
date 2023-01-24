import { extend } from 'vee-validate';
import { email, required } from 'vee-validate/dist/rules';
import UserService from '../../../../services/UserService';
import Loading from '../../../shared/loading/Loading.vue';
import VisitorNav from '../../../VisitorNav/VisitorNav.vue';
import AreaExternaHeader from '../../../AreaExterna/AreaExternaHeader/AreaExternaHeader.vue';

export default {
  name: 'LoginUsuario',
  components: {
    Loading,
    VisitorNav,
    AreaExternaHeader,
  },
  data() {
    return {
      password: '',
      email: '',
      userService: new UserService(),
      isLoading: false,
      hasAuthError: false,
      navs: [{ title: 'Home' }, { title: 'Login' }],
    };
  },
  mounted() {
    document.title = 'PUMA | Login';
  },
  methods: {
    async logar() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        const user = { email: this.email, password: this.password };
        this.isLoading = true;

        this.userService.logUserIn(user).then((response) => {
          this.isLoading = false;

          this.$store.commit('LOGIN_USER', {
            userId: response.data.userId,
            fullName: response.data.fullName,
            isAdmin: response.data.isAdmin,
            email: response.data.email,
            type: response.data.type,
          });
          this.$store.commit('SET_TOKEN', response.data.token);
          this.$router.push('/meus-projetos').catch(() => {});
        }).catch(() => {
          this.hasAuthError = true;
          this.isLoading = false;
        });
      }
    },
    mostrarOcultarSenha() {
      const senha = document.getElementById('senha');
      if (senha.type === 'password') {
        senha.type = 'text';
      } else {
        senha.type = 'password';
      }
    },
  },
};

extend('email', {
  ...email,
  validate(value) {
    if (value) {
      return email.validate(value);
    }
    return '';
  },
  message: 'Insira um email válido',
});
extend('required', {
  ...required,
  message: 'Preenchimento obrigatório ',
});
