/* eslint-disable */
import PartnerService from '../../../services/PartnerService';
// import ReturnButton from '../../shared/ReturnButton/ReturnButton.vue';

export default {
  props: {
    title: String,
    dataSubjects: Array,
    subjectSearch: String,
  },
  name: 'HomeParceiros',
  // components: {
  //   ReturnButton,
  // },
  data () {
    return {
      partnerService: new PartnerService(),
      partners: [],
      listSubjects: [],
      selectedPartner: '',
      partnerImgs: [],
    }
  },

  beforeMount() {
    this.getPartners();
  },
  watch: {
    dataSubjects() {
      this.listSubjects = this.dataSubjects;
    },
    subjectSearch() {
      if (this.subjectSearch) {
        this.listSubjects = this.dataSubjects.filter((item) => (
          item.name.toLowerCase().includes(this.subjectSearch.toLowerCase())));
      } else {
        this.listSubjects = this.dataSubjects;
      }
    },
  },
  
  methods: {
    sendInfo(item) {
      this.selectedPartner = item;
      this.partnerImgs = item.projectImages.split("&-&")
    },
    getPartners() {
      this.partnerService.getPartners().then((response) => {
        this.partners = response.data;
        console.log(this.partners)
      }).catch((e) => {
        console.log(e)
        this.makeToast('Erro de busca', 'Infelizmente houve um erro ao recuperar lista de parceiros, confira sua conexão com servidor e tente novamente', 'danger');
      });
    },
    partnerDetail(id) {
      this.$router.push({ path: `/parceiros/detalhes/${id}` });
    },
    editPartner(id) {
      this.$router.push({ path: `/parceiros/editar/${id}` });
    },
    makeToast(title, message, variant) {
      this.$bvToast.toast(message, {
        title, variant, solid: true, noAutoHide: true, appendToast: true,
      });
    },
  },
};
