import { shallowMount } from '@vue/test-utils';
import AreaExternaHeader from '../src/components/AreaExterna/AreaExternaHeader/AreaExternaHeader.vue';

describe('Testando criação do componente "AreaExternaHeader"', () => {
  it('Renderizando componente', () => {
    const wrapper = shallowMount(AreaExternaHeader);
    expect(wrapper.exists()).toBe(true);
  });
});

describe('Testando data() return', () => {
  it('data() return', () => {
    const wrapper = shallowMount(AreaExternaHeader);
    expect(wrapper.vm.dispMenu).toBe(false);
  })
});

describe('Testando Função "getDispMenu()" e  "setDispMenu()"', () => {
  it('Get and Set functions', () => {
    const wrapper = shallowMount(AreaExternaHeader);
    expect(wrapper.vm.getDispMenu()).toBe(false);
    wrapper.vm.setDispMenu(true);
    expect(wrapper.vm.getDispMenu()).toBe(true);
  });
});