import { shallowMount } from '@vue/test-utils';
import * as Cookies from 'js-cookie';
import Login from './Login.vue';

describe('Testando criação do componente "Login"', () => {
  it('Renderizando componente', () => {
    let wrapper = shallowMount(Login);
    expect(wrapper.exists()).toBe(true);
  });
});
