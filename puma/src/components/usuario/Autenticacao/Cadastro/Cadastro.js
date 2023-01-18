/* eslint-disable */
import { extend } from 'vee-validate';
import { regex } from 'vee-validate/dist/rules';
import Loading from '../../../shared/loading/Loading.vue';
import UserService from '../../../../services/UserService';
import VisitorNav from '../../../../components/VisitorNav/VisitorNav.vue';
import { validarTelefone, clearMasks } from '../../../../utils/validators-puma';
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
          await this.$router.push('/meus-projetos');
          this.makeToast('SUCESSO', 'Cadastro feito com sucesso!', 'success');
        }).catch(async (err) => {
          this.isLoading = false;
          this.makeToast('ERRO', 'Uma falha ocorreu ao efetuar o cadastro. Tente novamente.', 'danger');
        });
      }
    },
    makeToast: function (title, message, variant) {
      this.$bvToast.toast(message, { title: title, variant: variant, solid: true, autoHideDelay: 4000 });
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
        let isOk = this.verificaPreenchimento();
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
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validEmail = re.test(this.email);
        if (validEmail === true) {
          if (this.phoneNumber) {
            let validTelephone = validarTelefone(this.phoneNumber);
            if (validTelephone === true) {
              let validPassword = this.verificaSenha(this.password, this.repeatPassword);
              if (validPassword === true) {
                this.showMessage = false;
                return true;
              } else {
                return false;
              }
            } else {
              return false;
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    verificaSenha(senha, repitaSenha) {
      const letrasMaiusculas = /[A-Z]/;
      const letrasMinusculas = /[a-z]/;
      const numeros = /[0-9]/;
      if ((senha === repitaSenha) && (senha.length >= 6)) {
        if ((letrasMaiusculas.test(senha) || letrasMinusculas.test(senha)) && numeros.test(senha)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    mostrarOcultarSenha(element) {
      let senha = document.getElementById(element);
      if(senha.type === 'password') {
        senha.type = 'text';
      } else {
        senha.type = 'password'
      }
    },
  },
};

extend('regex', {
  // eslint-disable-next-line camelcase
  ...regex,
  message: 'Precisa ter letras e números',
});
