/* eslint-disable prefer-destructuring */
import BannerService from '../../../services/BannerService';
import ReturnButton from '../../shared/ReturnButton/ReturnButton.vue';

export default {
  name: 'CadastroDisciplina',
  components: {
    ReturnButton,
  },
  data() {
    return {
      bannerId: this.$route.params.id,
      title: '',
      description: '',
      bannerService: new BannerService(),
      isLoading: false,
      isTouchedImage: false,
      operacao: this.$route.path.split('/', 3)[2],
      imageSelected: '',
      buttonLabel: '',
      buttonLink: '',
      imageError: false,
      isEmphasis: false,
    };
  },
  async mounted() {
    try {
      this.$store.commit('OPEN_LOADING_MODAL', { title: 'Carregando...' });
      if (this.operacao === 'editar') {
        this.isLoading = true;
        await this.getBanner(this.bannerId);
      }
      this.$store.commit('CLOSE_LOADING_MODAL');
    } catch (error) {
      this.$store.commit('CLOSE_LOADING_MODAL');
    }
  },
  methods: {
    handleImage(input) {
      if (input.files && input.files[0]) {
        if (input.files[0].size > 2000000) {
          this.imageError = true;
          return;
        }
        this.imageError = false;
        const reader = new FileReader();

        reader.onload = (e) => {
          this.imageSelected = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
      }
    },

    async getBanner(id) {
      this.bannerService.getBannerById(id).then((response) => {
        this.isLoading = false;
        this.setInputs(response.data.bannerItem);
        this.makeToast('Falha ao consultar', `Infelizmente houve um erro ao consultar o banner "${response.data.bannerId}", confira sua conexão com servidor e tente novamente`, 'danger');
      }).catch(() => {
        this.isLoading = false;
        this.makeToast('Falha ao consultar', `Infelizmente houve um erro ao consultar o banner "${this.bannerId}", confira sua conexão com servidor e tente novamente`, 'danger');
        this.$store.commit('CLOSE_LOADING_MODAL');
      });
    },

    setInputs(banner) {
      this.title = banner.title;
      this.description = banner.description;
      this.isEmphasis = banner.isEmphasis;
      this.imageSelected = banner.bannerImage;
      this.buttonLink = banner.bannerLink;
      this.buttonLabel = banner.buttonLabel;
    },

    async onSubmit() {
      try {
        const isFormValid = await this.$refs.observer.validate();
        if (isFormValid) {
          this.$store.commit('OPEN_LOADING_MODAL', { title: 'Enviando...' });
          const banner = {
            title: this.title,
            description: this.description,
            isEmphasis: this.isEmphasis,
            bannerImage: this.imageSelected,
            bannerLink: this.buttonLink,
            buttonLabel: this.buttonLabel,
          };
          if (this.operacao === 'cadastrar') {
            this.bannerService.addBanner(banner).then(async () => {
              this.isLoading = false;
              await this.$router.push({ name: 'Destaques' });
              this.makeToast('Banner cadastrado', `O banner "${this.title}" foi cadastrado com sucesso`, 'success');
              this.$store.commit('CLOSE_LOADING_MODAL');
            }).catch(() => {
              this.isLoading = false;
              this.makeToast('Falha ao cadastrar', `Infelizmente houve um erro ao cadastrar o banner "${this.title}", confira sua conexão com servidor e tente novamente`, 'danger');
              this.$store.commit('CLOSE_LOADING_MODAL');
            });
          } else if (this.operacao === 'editar') {
            banner.bannerId = parseInt(this.$route.params.id, 10);
            banner.description = this.description;
            banner.isEmphasis = this.isEmphasis;
            banner.bannerImage = this.imageSelected;
            banner.bannerLink = this.buttonLink;
            banner.buttonLabel = this.buttonLabel;
            this.bannerService.updateBanner(banner.bannerId, banner).then(async () => {
              this.isLoading = false;
              await this.$router.push({ name: 'Destaques' });
              this.makeToast('Banner atualizado', `O banner "${this.title}" foi atualizado com sucesso`, 'success');
              this.$store.commit('CLOSE_LOADING_MODAL');
            }).catch(() => {
              this.isLoading = false;
              this.makeToast('Falha ao atualizar', `Infelizmente houve um erro ao atualizar o banner "${this.title}", confira sua conexão com servidor e tente novamente`, 'danger');
              this.$store.commit('CLOSE_LOADING_MODAL');
            });
          }
        }
      } catch (error) {
        this.$store.commit('CLOSE_LOADING_MODAL');
      }
    },
    makeToast(title, message, variant) {
      this.$bvToast.toast(message, {
        title, variant, solid: true, noAutoHide: true, appendToast: true,
      });
    },
  },
};
