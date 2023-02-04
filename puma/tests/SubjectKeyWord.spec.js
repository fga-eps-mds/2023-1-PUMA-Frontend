import KeywordService from '../src/services/KeywordService'
let keywordService = new KeywordService();

describe('Delete Keyword', () => {
    it('Should delete keyword', () => {
        expect(keywordService.deleteKeyword(1)).resolves.toEqual('');
    })
})

describe('Add Keyword to Subject', () => {
    it('Should add keyword to subject', () => {
        expect(keywordService.addKeywordToSubject(1,1)).resolves.toEqual('');
    })
})

describe('Update Keyword to subject', () => {
    it('Should update keyword to subject', () => {
        expect(keywordService.updateSubjectKeyword(1, 1)).resolves.toEqual('');
    })
})