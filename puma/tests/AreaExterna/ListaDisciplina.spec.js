import ListaDisciplina from '../../src/components/AreaExterna/Disciplinas/Disciplina.js'


describe('Get Sobre data', () => {
    it('Should get sobre data', () => {
        let response = {
            paginaAtual: '/home/disciplinas',
        };
        expect(ListaDisciplina.data()).toStrictEqual(response);
    })
})