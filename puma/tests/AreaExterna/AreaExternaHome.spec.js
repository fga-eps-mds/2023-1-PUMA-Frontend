import Home from '../../src/components/AreaExterna/HomePage.js';

describe('Get Home data', () => {
    it('Should get Home data', () => {
        let response = {
            pagina: '/home',
        };
        expect(Home.data()).toStrictEqual(response);
    })
  })