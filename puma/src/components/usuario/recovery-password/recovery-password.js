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
    document.title = 'PUMA | Recuperar Senha';
  },
  data() {
    return {
      email: '',
      isLoading: false,
      hasAuthError: false,
      successEmailReceived: false,
      emailWrongFormat: false,
      emailNotfound: false,
      userService: new UserService(),
      navs: [{ title: 'Home' }, { title: 'Recuperação de Senha' }],
    };
  },
  created() {
    localStorage.email = '';
  },
  methods: {
    disableError() {
      this.emailNotfound = false;
    },
    async enviarEmail() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.userService.sendEmail(this.email, (res) => {
          if (res.status === 200) {
            localStorage.email = this.email;
            this.emailNotfound = false;
            this.successEmailReceived = true;
          } else if (res.status === 404) {
            this.hasAuthError = true;
            this.emailNotfound = true;
          }
        });
      }
    },
  },
};
