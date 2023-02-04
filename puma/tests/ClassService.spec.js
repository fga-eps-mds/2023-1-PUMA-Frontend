import ClassService from '../src/services/ClassService'

let classService = new ClassService();

describe('Update Class', () => {
    it('Should update a class', () => {
        expect(classService.updateClass(1, '')).resolves.toEqual('');
    })
})

describe('Delete Class', () => {
    it('Should delete a class', () => {
        expect(classService.deleteSubject(1)).resolves.toEqual('');
    })
})

describe('Get class by id', () => {
    it('Should get class', () => {
        expect(classService.getClassById(1)).resolves.toEqual('');
    })
})
