import Sobre from '../../src/components/AreaExterna/Sobre/Sobre'
import { shallowMount } from '@vue/test-utils';

describe('Get Sobre data', () => {
    it('Should get sobre data', () => {
        let response = {
            paginaAtual: '/home/sobre',
        };
        expect(Sobre.data()).toStrictEqual(response);
    })
})