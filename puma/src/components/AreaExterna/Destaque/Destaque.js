import BannerService from '../../../services/BannerService';

export default {
  name: 'Destaque',

  async beforeMount() {
    this.getBanner();
  },

  data() {
    return {
      banner: {},
      loading: false,
      bannerService: new BannerService(),
    };
  },

  methods: {
    async getBanner() {
      this.bannerService.getHighlightBanner().then((response) => {
        this.banner = response.data;
        this.loading = false;
      }).catch(() => {
      });
    },
    goToLink() {
      window.location.href = 'http://example.com';
    },
  },
};
