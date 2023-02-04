import KeywordService from '../src/services/KeywordService';
let keywordService = new KeywordService();

describe('Update Keyword', () => {
    it('Should update keyword', () => {
        expect(keywordService.updateKeyword(1, '')).resolves.toEqual('');
    })
})

describe('Add Keyword', () => {
    it('Should add keyword', () => {
        expect(keywordService.addKeyword('')).resolves.toEqual('');
    })
})

describe('Get Keyword', () => {
    it('Should get keywords', () => {
        expect(keywordService.getKeywords()).resolves.toEqual('');
    })
})