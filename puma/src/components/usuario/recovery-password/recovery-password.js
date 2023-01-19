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
    document.title = 'PUMA | Recuperar Senha';
  },
  data() {
    return {
      email: '',
      isLoading: false,
      successEmailReceived: false,
      emailWrongFormat: false,
      emailNotfound: false,
      userService: new UserService(),
      navs: [{ title: 'Home' }, { title: 'Recuperação de Senha' }],
    };
  },
  computed: {
    isButtonDisabled() {
      return this.email.length <= 0;
    },
    buttonStatus() {
      return this.email.length > 0 ? 'submit-btn-unlocked' : 'submit-btn';
    },
  },
  created() {
    localStorage.email = '';
  },
  methods: {
    async enviarEmail() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.userService.sendEmail(this.email, (res) => {
          if (res.status === 200) {
            localStorage.email = this.email;
            this.successEmailReceived = true;
          } else if (res.status === 404) {
            this.successEmailReceived = true;
          }
        });
      }
    },
  },
};
