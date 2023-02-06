import ProjectService from '../../src/services/ProjectService'

let projectService = new ProjectService();

//describe('Get Available Keywords to Project', () => {
//    it('Should get available keywords to project', () => {
//        expect(projectService.getAvailableKeywordsToProject()).resolves.toEqual('');
//    })
//})

describe('Add Project', () => {
    it('Should add  Project', () => {
        expect(projectService.addProject('')).resolves.toEqual('');
    })
})

describe('Update Project', () => {
    it('Should update a Project', () => {
        expect(projectService.updateProject(1, '')).resolves.toEqual('');
    })
})

describe('Delete Project', () => {
    it('Should delete a Project', () => {
        expect(projectService.deleteProject(1)).resolves.toEqual('');
    })
})


describe('Evaluate Project', () => {
    it('Should Evaluate  a Project', () => {
        expect(projectService.evaluateProject(1, '')).resolves.toEqual('');
    })
})


describe('reallocate Project', () => {
    it('Should reallocate  a Project', () => {
        expect(projectService.reallocateProject(1, '')).resolves.toEqual('');
    })
})
