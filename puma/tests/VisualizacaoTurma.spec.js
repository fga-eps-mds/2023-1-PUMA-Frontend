import { shallowMount } from '@vue/test-utils';
import VisualizacaoTurma from '../src/components/turma/visualizacao-turma/VisualizacaoTurma.vue';
import store from '../src/store';

describe('Testando criação do componente "VisualizacaoTurma"', () => {
  it('Renderizando componente', () => {
    const wrapper = shallowMount(VisualizacaoTurma, {
      mocks: {
        $cookies: {
          get: jest.fn().mockReturnValue(null),
          set: jest.fn(),
        },
        $store: store,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});

describe('Testando dados do componente "VisualizacaoTurma"', () => {
  it('Renderizando componente', () => {
    const wrapper = shallowMount(VisualizacaoTurma, {
      mocks: {
        $cookies: {
          get: jest.fn().mockReturnValue(null),
          set: jest.fn(),
        },
        $store: store,
      },
    });
    expect(wrapper.vm.subjectSearch).toBe(null);
    expect(wrapper.vm.dispMySubjects).toBe(false);
    expect(wrapper.vm.dispTimeFIlter).toBe(false);
    expect(wrapper.vm.listYears).toStrictEqual([
      { date: 2023, selected: false },
      { date: 2022, selected: false },
      { date: 2021, selected: false },
      { date: 2020, selected: false },
    ]);
    expect(wrapper.vm.listSemesters).toStrictEqual([
      { name: '1°', selected: false, value: '1' },
      { name: '2°', selected: false, value: '2' },
      { name: 'Verão', selected: false, value: 'VERAO' },
    ]);
  });
});
