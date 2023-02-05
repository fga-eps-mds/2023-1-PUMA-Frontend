import ConfirmModal from '../../src/components/ConfirmModal/ConfirmModal'
import { shallowMount } from '@vue/test-utils';
import store from '../../src/store';

//let store = {
//        getters: {
//            confirmModal: {
//                open: false,
//            }
//        }
//    }

describe('Confirm Modal', () => {
    it('Should return isVisible method', () => {
        const wrapper = shallowMount(ConfirmModal, {
            mocks: {
                $store: store,
            }
        })

        expect(wrapper.vm.isVisible()).toBe(false)
    })
})