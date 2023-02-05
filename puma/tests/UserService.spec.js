import UserService from '../src/services/UserService'
import ProjectService from '../src/services/ProjectService'

let projectService = new ProjectService();
let userService = new UserService(); 

describe('Get My Proposals', () => {
    it('Should get proposals', () => {
        expect(projectService.getMyProposals(1)).resolves.toEqual('');
    })
})

describe('Register user', () => {
    it('Should register user', () => {
        expect(userService.registerUser('')).resolves.toEqual('');
    })
})