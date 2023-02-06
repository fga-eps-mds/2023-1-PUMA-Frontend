import ListaConsultaDisciplina from '../../src/components/disciplina/consulta-disciplina/ListaConsultaDisciplina/ListaConsultaDisciplina'

describe('Get Lista Consulta Disciplina Data', () => {
    it('Should get Lista Consulta Disciplina data', () => {
        let response = {
            listSubjects: [],
          };
        expect(ListaConsultaDisciplina.data()).toStrictEqual(response);
    })
  })