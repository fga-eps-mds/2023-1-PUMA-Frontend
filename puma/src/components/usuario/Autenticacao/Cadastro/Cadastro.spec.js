import { shallowMount } from '@vue/test-utils';
import Cadastro from './Cadastro.vue';

describe('Testando criação do componente "Cadastro"', () => {
  it('Renderizando componente', () => {
    let wrapper = shallowMount(Cadastro, {
      mocks: {
        $cookies: {
          get: jest.fn().mockReturnValue(null),
          set: jest.fn(),
        }
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});
