import SubjectService from '../src/services/SubjectService'

describe('Get SubAreas', () => {
    it('Should Professors', () => {
        let subjectService = new SubjectService();
        expect(subjectService.getSubareas()).resolves.toEqual('');
    })
})