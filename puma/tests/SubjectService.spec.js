import SubjectService from '../src/services/SubjectService'

let subjectService = new SubjectService();

describe('Add subject', () => {
    it('Should add a subject', () => {
        expect(subjectService.addSubject('')).resolves.toEqual('');
    })
})

describe('Get subject by id', () => {
    it('Should get subject', () => {
        expect(subjectService.getSubjectById(1)).resolves.toEqual('');
    })
})

describe('Update subject', () => {
    it('Should update a subject', () => {
        expect(subjectService.updateSubject(1, '')).resolves.toEqual('');
    })
})

describe('Delete subject', () => {
    it('Should delete a subject', () => {
        expect(subjectService.deleteSubject(1)).resolves.toEqual('');
    })
})

describe('Get Knowledge Areas', () => {
    it('Should get knowledge Areas', () => {
        expect(subjectService.getKnowledgeAreas()).resolves.toEqual('');
    })
})