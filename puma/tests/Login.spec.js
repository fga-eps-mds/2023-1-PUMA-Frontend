import { shallowMount } from '@vue/test-utils';
import Login from '../src/components/usuario/Autenticacao/Login/Login.vue';
import LoginJS from '../src/components/usuario/Autenticacao/Login/Login'
import UserService from '../src/services/UserService'

describe('Testando criação do componente "Login"', () => {
  it('Renderizando componente', () => {
    const wrapper = shallowMount(Login);
    expect(wrapper.exists()).toBe(true);
  });
});

describe('Login User', () => {
  it('Should login user', () => {
      let userService = new UserService(); 
      expect(userService.logUserIn('')).resolves.toEqual('');
  })
})

describe('Get Login Data', () => {
  it('Should get login data', () => {
      let response = {
        password: '',
        email: '',
        userService: new UserService(),
        isLoading: false,
        hasAuthError: false,
        navs: [{ title: 'Home' }, { title: 'Login' }],
      };
      expect(LoginJS.data()).toStrictEqual(response);
  })
})
