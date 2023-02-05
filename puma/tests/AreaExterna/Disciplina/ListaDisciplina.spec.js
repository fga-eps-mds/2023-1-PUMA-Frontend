import ListaDisciplina from '../../../src/components/AreaExterna/Disciplinas/ListaDisciplina/ListaDisciplina'
import SubjectService from '../../../src/services/SubjectService';

describe('Get Lista Disciplina data', () => {
    it('Should get lista disciplina data', () => {
        let response = {
            disciplinaAtual: {},
            listaDisciplinas: [],
            loading: false,
            error: null,
            subjectService: new SubjectService(),
          };
        expect(ListaDisciplina.data()).toEqual(response);
    })
})