import { shallowMount } from '@vue/test-utils';
import Login from '../src/components/usuario/Autenticacao/Login/Login.vue';

describe('Testando criação do componente "Login"', () => {
  it('Renderizando componente', () => {
    const wrapper = shallowMount(Login);
    expect(wrapper.exists()).toBe(true);
  });
});
