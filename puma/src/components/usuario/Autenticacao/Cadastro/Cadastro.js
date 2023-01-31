import { extend } from 'vee-validate';
import { regex } from 'vee-validate/dist/rules';
import Loading from '../../../shared/loading/Loading.vue';
import UserService from '../../../../services/UserService';
import VisitorNav from '../../../VisitorNav/VisitorNav.vue';
import { validarTelefone } from '../../../../utils/validators-puma';
import AreaExternaHeader from '../../../AreaExterna/AreaExternaHeader/AreaExternaHeader.vue';

export default {
  name: 'CadastroUsuario',
  components: {
    Loading,
    VisitorNav,
    AreaExternaHeader,
  },
  mounted() {
    document.title = 'PUMA | Cadastro Usuário';
  },
  data() {
    return {
      userService: new UserService(),
      name: null,
      email: null,
      phoneNumber: '',
      matricula: '',
      password: null,
      repeatPassword: null,
      cnpj: '',
      companyName: '',
      socialReason: '',
      cpf: '',
      type: '',
      externalAgentType: '',
      passwordTypeText: false,
      repeatPasswordTypeText: false,
      isFirstPage: true,
      isLoading: false,
      hasMatricula: false,
      isJuridical: false,
      isPhysical: false,
      isExternalAgent: false,
      navs: [{ title: 'Home' }, { title: 'Login' }, { title: 'Cadastro' }],
      showMessage: false,
    };
  },
  methods: {
    async onSubmit() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        const newUser = {
          name: this.name,
          email: this.email,
          phoneNumber: this.clearMask(this.phoneNumber),
          password: this.password,
          repeatPassword: this.repeatPassword,
          matricula: this.clearMask(this.matricula),
          type: this.type,
          externalAgentType: this.externalAgentType,
          cnpj: this.clearMask(this.cnpj),
          cpf: this.clearMask(this.cpf),
          companyName: this.companyName,
          socialReason: this.socialReason,
        };
        this.isLoading = true;
        this.userService.registerUser(newUser).then(async () => {
          const user = { email: this.email, password: this.password };
          this.userService.logUserIn(user).then((response) => {
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
            this.isLoading = false;
          });
        }).catch(async () => {
          this.isLoading = false;
          this.makeToast('Erro ao cadastrar', 'Uma falha ocorreu ao efetuar o cadastro. Confira os dados inseridos e a sua conexão e tente novamente.', 'danger');
        });
      }
    },
    makeToast(title, message, variant) {
      this.$bvToast.toast(message, {
        title, variant, solid: true, noAutoHide: true, appendToast: true,
      });
    },
    alterarTipoUsuario() {
      if (this.type === 'Aluno' || this.type === 'Professor') {
        this.hasMatricula = true;
        this.isExternalAgent = false;
        this.isJuridical = false;
        this.isPhysical = false;
        this.externalAgentType = '';
      } else if (this.type === 'Agente Externo') {
        this.hasMatricula = false;
        this.isExternalAgent = true;
      }
      this.matricula = '';
      this.clearJuridicalAgentData();
    },
    alterarTipoAgenteExterno() {
      this.clearJuridicalAgentData();
      this.clearPhysicalAgentData();
      if (this.externalAgentType === 'Pessoa Fisica') {
        this.isPhysical = true;
        this.isJuridical = false;
      } else if (this.externalAgentType === 'Pessoa Juridica') {
        this.isJuridical = true;
        this.isPhysical = false;
      } else {
        this.isPhysical = false;
        this.isJuridical = false;
      }
    },
    clearJuridicalAgentData() {
      this.socialReason = '';
      this.cnpj = '';
      this.companyName = '';
    },
    clearPhysicalAgentData() {
      this.cpf = '';
    },
    clearMask(maskedValue) {
      return maskedValue.replace(/_|-|\(|\)|\.|\/|\s/g, '');
    },
    changePage(x) {
      if (x === 1) {
        const isOk = this.verificaPreenchimento();
        if (isOk === true) {
          this.isFirstPage = !this.isFirstPage;
        } else {
          this.showMessage = true;
        }
      } else if (x === 2) {
        this.isFirstPage = !this.isFirstPage;
      }
    },
    verificaPreenchimento() {
      if (this.name && this.email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const validEmail = re.test(this.email);
        if (validEmail === true) {
          if (this.phoneNumber) {
            const validTelephone = validarTelefone(this.phoneNumber);
            if (validTelephone === true) {
              const validPassword = this.verificaSenha(this.password, this.repeatPassword);
              if (validPassword === true) {
                this.showMessage = false;
                return true;
              }
              return false;
            }
            return false;
          }
          return false;
        }
        return false;
      }
      return false;
    },
    verificaSenha(senha, repitaSenha) {
      const letrasMaiusculas = /[A-Z]/;
      const letrasMinusculas = /[a-z]/;
      const numeros = /[0-9]/;
      if ((senha === repitaSenha) && (senha.length >= 6)) {
        if ((letrasMaiusculas.test(senha) || letrasMinusculas.test(senha)) && numeros.test(senha)) {
          return true;
        }
        return false;
      }
      return false;
    },
    mostrarOcultarSenha(element) {
      const senha = document.getElementById(element);
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
  message: 'Precisa ter letras e números',
});
