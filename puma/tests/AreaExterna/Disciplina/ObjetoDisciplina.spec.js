import ObjetoDisciplina from '../../../src/components/AreaExterna/Disciplinas/ObjetoDisciplina/ObjetoDisciplina'
import SubjectService from '../../../src/services/SubjectService';


describe('Get Objeto Disciplina data', () => {
    it('Should get Objeto disciplina data', () => {
        let response = {
            subjectService: new SubjectService(),
            loading: false,
            error: null,
            disciplina: {},
          };
        expect(ObjetoDisciplina.data()).toEqual(response);
    })
})