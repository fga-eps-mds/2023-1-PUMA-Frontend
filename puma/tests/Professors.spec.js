import SubjectService from '../src/services/SubjectService'

describe('Get Professors', () => {
    it('Should Professors', () => {
        let subjectService = new SubjectService();
        expect(subjectService.getProfessors()).resolves.toEqual('');
    })
})