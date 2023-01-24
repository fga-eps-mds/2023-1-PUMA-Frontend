import { shallowMount } from '@vue/test-utils';
import RecoveryPassword from '../src/components/usuario/recovery-password/RecoveryPassword.vue';

describe('Testando criação do componente "Recuperação de Senha"', () => {
  it('Renderizando componente', () => {
    const wrapper = shallowMount(RecoveryPassword);
    expect(wrapper.exists()).toBe(true);
  });
});

describe('Testando dados do componente "Recuperação de Senha"', () => {
  it('Renderizando componente', () => {
    const wrapper = shallowMount(RecoveryPassword, {
      mocks: {
        $cookies: {
          get: jest.fn().mockReturnValue(null),
          set: jest.fn(),
        },
      },
    });
    expect(wrapper.vm.email).toBe('');
    expect(wrapper.vm.isLoading).toBe(false);
    expect(wrapper.vm.successEmailReceived).toBe(false);
    expect(wrapper.vm.emailWrongFormat).toBe(false);
    expect(wrapper.vm.emailNotfound).toBe(false);
  });
});
