import BannerService from '../../../services/BannerService';
import ListaTabelaDestaque from './tabela-destaque/TabelaDestaque.vue';

export default {
  beforeMount() {
    this.getBanners();
  },

  components: {
    ListaTabelaDestaque,
  },

  data: () => ({
    isLoading: false,
    wasLoaded: false,
    isDeletingBanner: false,
    banners: [],
    bannerService: new BannerService(),
  }),

  methods: {
    getBanners() {
    //   this.$store.commit('OPEN_LOADING_MODAL', { title: 'Carregando...' });
      this.bannerService.getBanners().then((response) => {
        this.banners = response.data;
        this.$store.commit('CLOSE_LOADING_MODAL');
      }).catch(() => {
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('Erro de busca', 'Erro ao recuperar a lista de disciplinas, confira sua conexão com servidor e tente novamente', 'danger');
      });
    },
    makeToast(toastTitle, toastMessage, toastVariant) {
      this.$bvToast.toast(toastMessage, {
        title: toastTitle, variant: toastVariant, solid: true, noAutoHide: 5000,
      });
    },
  },
};
