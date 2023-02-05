import LoadingModal from '../../src/components/LoadingModal/LoadingModal'
import { shallowMount } from '@vue/test-utils';
import store from '../../src/store';

describe('Loading Modal', () => {
    it('Should return isVisible method', () => {
        const wrapper = shallowMount(LoadingModal, {
            mocks: {
                $store: store,
            }
        })

        expect(wrapper.vm.isVisible()).toBe(false)
    })
})