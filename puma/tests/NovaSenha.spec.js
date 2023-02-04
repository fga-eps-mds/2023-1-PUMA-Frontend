import { shallowMount } from '@vue/test-utils';
import NewPassword from '../src/components/usuario/new-password/NewPassword.vue';
import NewPass from '../src/components/usuario/new-password/new-password.js'
import UserService from '../src/services/UserService'


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

describe('Update Password', () => {
  let userService = new UserService(); 
  it('Should update password', () => {
      expect(userService.updatePassword('', '', '')).resolves.toEqual('');
  })
})

describe('Get Nova Senha data', () => {
  it('Should get Nova Senha data', () => {
      let response = {
        userService: new UserService(),
        newPassword: '',
        confirmNewPassword: '',
        isLoading: false,
        isEqualsToNewPassword: true,
        passwordRedefined: false,
        navs: [{ title: 'Home' }, { title: 'Recuperação de Senha' }],
      };
      expect(NewPass.data()).toStrictEqual(response);
  })
})