import { shallowMount } from '@vue/test-utils';
import Cadastro from '../src/components/usuario/Autenticacao/Cadastro/Cadastro.vue';
import CadastroUsuario from '../src/components/usuario/Autenticacao/Cadastro/Cadastro.js';
import UserService from '../src/services/UserService'

let userService = new UserService(); 

describe('Testando criação do componente "Cadastro"', () => {
  it('Renderizando componente', () => {
    const wrapper = shallowMount(Cadastro, {
      mocks: {
        $cookies: {
          get: jest.fn().mockReturnValue(null),
          set: jest.fn(),
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});


describe('Send Email', () => {
    it('Should send email', () => {
        expect(userService.sendEmail('', '')).resolves.toEqual('');
    })
})

describe('Get Cadastro data', () => {
  it('Should get cadastro data', () => {
      let response = {
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
      expect(CadastroUsuario.data()).toStrictEqual(response);
  })
})