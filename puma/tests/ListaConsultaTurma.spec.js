import { shallowMount } from '@vue/test-utils';
import ListaConsultaTurma from '../src/components/turma/visualizacao-turma/ListaConsultaTurma/ListaConsultaTurma.vue';
import store from '../src/store';
import ClassService from '../src/services/ClassService'
import SubjectService from '../src/services/SubjectService'
import Lista from '../src/components/turma/visualizacao-turma/ListaConsultaTurma/ListaConsultaTurma.js';

let classService = new ClassService();

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

describe('Get Classes', () => {
  it('Should get all classes', () => {
      expect(classService.getClasses()).resolves.toEqual('');
  })
})

describe('Get ListaConsultaTurma data', () => {
  it('Should get ListaConsultaTurma data', () => {
      let response = {
        listSubjects: [],

        listClassesEditable: [],
    
        listClasses: [],
    
        classService: new ClassService(),
    
        subjectService: new SubjectService(),
      };
      expect(Lista.data()).toEqual(response);
  })
})
