import Disciplina from '../../../src/components/AreaExterna/Disciplinas/Disciplina.js'

describe('Get Disciplina data', () => {
    it('Should get disciplina data', () => {
        let response = {
            paginaAtual: '/home/disciplinas',
          };
        expect(Disciplina.data()).toStrictEqual(response);
    })
})