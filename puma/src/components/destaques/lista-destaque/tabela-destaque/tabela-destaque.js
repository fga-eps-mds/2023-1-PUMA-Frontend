/* eslint-disable prefer-destructuring */
import BannerService from '../../../../services/BannerService';

export default {
  props: {
    dataBanners: Array,
  },

  data() {
    return {
      listBanners: [],
      bannerService: new BannerService(),
    };
  },

  watch: {
    dataBanners() {
      this.listBanners = this.dataBanners;
    },
  },

  methods: {
    async deleteBanner(id) {
      try {
        await this.bannerService.deleteBanner(id);
        this.$store.commit('CLOSE_LOADING_MODAL');
        window.location.reload();
        this.makeToast('Destaque excluido com sucesso', 'O destaque foi excluido com sucesso', 'success');
      } catch (error) {
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('Erro ao excluir', `Infelizmente houve um erro ao excluir o destaque "${error}", confira sua conexão com servidor e tente novamente`, 'danger');
      }
    },

    editBanner(id) {
      this.$router.push({ path: `/destaques/editar/${id}` });
    },

    makeToast(toastTitle, toastMessage, toastVariant) {
      this.$bvToast.toast(toastMessage, {
        title: toastTitle, variant: toastVariant, solid: true, noAutoHide: 5000,
      });
    },
  },
};
