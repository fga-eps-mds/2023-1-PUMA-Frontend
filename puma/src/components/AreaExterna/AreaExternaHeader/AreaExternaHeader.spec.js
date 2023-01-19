import { shallowMount } from '@vue/test-utils';
import AreaExternaHeader from './AreaExternaHeader.vue';

describe('Testando criação do componente "AreaExternaHeader"', () => {
  it('Renderizando componente', () => {
    const wrapper = shallowMount(AreaExternaHeader);
    expect(wrapper.exists()).toBe(true);
  });
});

describe('Testando Função "getDispMenu()" e  "setDispMenu()"', () => {
  it('Renderizando componente', () => {
    const wrapper = shallowMount(AreaExternaHeader);
    expect(wrapper.vm.getDispMenu()).toBe(false);
    wrapper.vm.setDispMenu(true);
    expect(wrapper.vm.getDispMenu()).toBe(true);
  });
});
