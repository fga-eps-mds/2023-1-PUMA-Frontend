import { shallowMount } from '@vue/test-utils';
import Login from '../src/components/usuario/Autenticacao/Login/Login.vue';
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