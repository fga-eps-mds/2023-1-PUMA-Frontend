import statusProjetoEnum from '../../src/utils/enums/status-projeto.enum';

describe('Get Descrição', () => {
    it('Should get descrição', () => {
        expect(statusProjetoEnum.methods.getDescricao('SB')).toBe('Proposta Submetida');
    })

    it('Should not get descrição', () => {
        expect(statusProjetoEnum.methods.getDescricao('XX')).toBe(null);
    })
})

describe('Formatted Date', () => {
    it('Should not get formatted date', () => {
        expect(statusProjetoEnum.methods.formattedDate('')).toBe('-');
    })

    it('Should get formatted date', () => {
        expect(statusProjetoEnum.methods.formattedDate('1995-12-17T03:24:00')).toBe('17/11/1995');
    })
})