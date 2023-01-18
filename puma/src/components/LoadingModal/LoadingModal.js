/* eslint-disable */

export default {
    name: 'LoadingModal',
    components: {},
    methods: {
        isVisible() {
            return this.$store.getters.loadingModal.open;
        },
    }
}