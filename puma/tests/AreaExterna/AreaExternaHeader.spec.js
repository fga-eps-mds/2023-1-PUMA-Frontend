import { shallowMount } from '@vue/test-utils';
import AreaExternaHeader from '../../src/components/AreaExterna/AreaExternaHeader/AreaExternaHeader.vue';
import AreaExterna from '../../src/components/AreaExterna/AreaExternaHeader/AreaExternaHeader.js';

describe('Testando criação do componente "AreaExternaHeader"', () => {
  it('Renderizando componente', () => {
    const wrapper = shallowMount(AreaExternaHeader);
    expect(wrapper.exists()).toBe(true);
  });
});

describe('Get AreaExterna data', () => {
  it('Should get AreaExterna data', () => {
      let response = {
        dispMenu: false,
      };
      expect(AreaExterna.data()).toStrictEqual(response);
  })
})

describe('Testando Função "getDispMenu()" e  "setDispMenu()"', () => {
  it('Get and Set functions', () => {
    AreaExterna.methods.setDispMenu(true);
    expect(AreaExterna.methods.getDispMenu()).toBe(true);    
  });
});