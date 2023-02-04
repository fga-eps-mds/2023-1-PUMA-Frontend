import UserService from '../src/services/UserService'

let userService = new UserService(); 

describe('Register user', () => {
    it('Should register user', () => {
        expect(userService.registerUser('')).resolves.toEqual('');
    })
})