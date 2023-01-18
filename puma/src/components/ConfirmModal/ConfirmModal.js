/* eslint-disable */

export default {
    name: 'ConfirmModal',
    components: {},
    methods: {
        isVisible() {
            return this.$store.getters.confirmModal.open;
        },
        handleClose() {
            this.$store.commit('CLOSE_CONFIRM_MODAL');
        }
    }
}