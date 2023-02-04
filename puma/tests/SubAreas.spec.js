import SubjectService from '../src/services/SubjectService'

describe('Get SubAreas', () => {
    it('Should get subareas', () => {
        let subjectService = new SubjectService();
        expect(subjectService.getSubareas()).resolves.toEqual('');
    })
})