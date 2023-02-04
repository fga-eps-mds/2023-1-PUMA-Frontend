import SubjectService from '../src/services/SubjectService'

describe('Add subject test', () => {
    it('Should add a subject', () => {
        let subjectService = new SubjectService();
        expect(subjectService.addSubject('')).resolves.toEqual('');
    })
})

describe('Get Knowledge Areas', () => {
    it('Should get knowledge Areas', () => {
        let subjectService = new SubjectService();
        expect(subjectService.getKnowledgeAreas()).resolves.toEqual('');
    })
})