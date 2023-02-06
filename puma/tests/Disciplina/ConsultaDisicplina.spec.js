import ConsultaDisciplina from '../../src/components/disciplina/consulta-disciplina/consulta-disciplina'
import SubjectService from '../../src/services/SubjectService';

describe('Get Consulta Disicplina Data', () => {
    it('Should get Consulta disciplina data', () => {
        let response = {
            subjectSearch: null,
            isLoading: false,
            wasLoaded: false,
            isDeletingSubject: false,
            subjects: [],
            mySubjects: [],
            subjectService: new SubjectService(),
          }
        expect(ConsultaDisciplina.data()).toStrictEqual(response);
    })
  })
  