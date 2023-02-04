import SubjectService from '../src/services/SubjectService'

describe('Add subject test', () => {
    it('Should add a subject', () => {
        let subjectService = new SubjectService();
        expect(subjectService.addSubject('')).resolves.toEqual('');
    })
})