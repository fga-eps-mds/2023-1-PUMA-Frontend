import { shallowMount } from '@vue/test-utils';
import NewPassword from '../src/components/usuario/new-password/NewPassword.vue';

describe('Testando criação do componente "Nova Senha"', () => {
  it('Renderizando componente', () => {
    const wrapper = shallowMount(NewPassword, {
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

describe('Testando dados do componente "Nova Senha"', () => {
  it('Renderizando componente', () => {
    const wrapper = shallowMount(NewPassword, {
      mocks: {
        $cookies: {
          get: jest.fn().mockReturnValue(null),
          set: jest.fn(),
        },
      },
    });
    expect(wrapper.vm.newPassword).toBe('');
    expect(wrapper.vm.confirmNewPassword).toBe('');
    expect(wrapper.vm.isLoading).toBe(false);
    expect(wrapper.vm.isEqualsToNewPassword).toBe(true);
    expect(wrapper.vm.passwordRedefined).toBe(false);
  });
});
