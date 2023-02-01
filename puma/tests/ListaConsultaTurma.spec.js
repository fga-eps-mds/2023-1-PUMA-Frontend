import { shallowMount } from '@vue/test-utils';
import ListaConsultaTurma from '../src/components/turma/visualizacao-turma/ListaConsultaTurma/ListaConsultaTurma.vue';
import store from '../src/store';

describe('Testando criação do componente "EdicaoTurma"', () => {
  it('Renderizando componente', () => {
    const wrapper = shallowMount(ListaConsultaTurma, {
      mocks: {
        $cookies: {
          get: jest.fn().mockReturnValue(null),
          set: jest.fn(),
        },
        $store: store,
      },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.vm.formatSemester('1')).toBe('1°');
  });
});

describe('Testando função de formatação do semestre', () => {
  it('Renderizando componente', () => {
    const wrapper = shallowMount(ListaConsultaTurma, {
      mocks: {
        $cookies: {
          get: jest.fn().mockReturnValue(null),
          set: jest.fn(),
        },
        $store: store,
      },
    });
    expect(wrapper.vm.formatSemester('1')).toBe('1°');
    expect(wrapper.vm.formatSemester('2')).toBe('2°');
    expect(wrapper.vm.formatSemester('VERAO')).toBe('Verão');
    expect(wrapper.vm.formatSemester('teste')).toBe('-');
  });
});
