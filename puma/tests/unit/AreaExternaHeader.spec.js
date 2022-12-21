import { shallowMount } from '@vue/test-utils';
import AreaExternaHeader from '@/components/AreaExterna/AreaExternaHeader/AreaExternaHeader.vue';

describe('Testando criação do componente AreaExternaHeader', () => {
  it('Renderizando componente', () => {
    const wrapper = shallowMount(AreaExternaHeader);
    expect(wrapper.exists()).toBe(true);
  });
});
