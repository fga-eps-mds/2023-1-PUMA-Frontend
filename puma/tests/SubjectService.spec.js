import SubjectService from '../src/services/SubjectService'


describe('Add subject', () => {
    it('Should add a subject', () => {
        let subjectService = new SubjectService();
        expect(subjectService.addSubject('')).resolves.toEqual('');
    })
})

describe('Get subject by id', () => {
    it('Should get subject', () => {
        let subjectService = new SubjectService();
        expect(subjectService.getSubjectById(1)).resolves.toEqual('');
    })
})

describe('Update subject', () => {
    it('Should update a subject', () => {
        let subjectService = new SubjectService();
        expect(subjectService.updateSubject(1, '')).resolves.toEqual('');
    })
})

describe('Delete subject', () => {
    it('Should delete a subject', () => {
        let subjectService = new SubjectService();
        expect(subjectService.deleteSubject(1)).resolves.toEqual('');
    })
})

describe('Get Knowledge Areas', () => {
    it('Should get knowledge Areas', () => {
        let subjectService = new SubjectService();
        expect(subjectService.getKnowledgeAreas()).resolves.toEqual('');
    })
})
