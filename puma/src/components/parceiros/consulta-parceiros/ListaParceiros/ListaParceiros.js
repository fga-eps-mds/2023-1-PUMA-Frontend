/* eslint-disable */
import PartnerService from '../../../../services/PartnerService';
// import ReturnButton from '../../shared/ReturnButton/ReturnButton.vue';

export default {
  props: {
    title: String,
    partners: Array,
    partnerSearch: String,
  },
  name: 'ListaParceiros',
  // components: {
  //   ReturnButton,
  // },
  data () {
    return {
      partnerService: new PartnerService(),
      // partners: [],
      listPartners: [],
    }
  },

  beforeMount() {
    // this.getPartners();
  },
  // watch: {
  //   partners() {
  //     this.listPartners = this.partners;
  //   },
  //   partnerSearch() {
  //     console.log(this.partnerSearch)
  //     console.log(this.listPartners)
  //     if (this.partnerSearch) {
  //       this.listPartners = this.partners.filter((item) => (
  //         item.name.toLowerCase().includes(this.partnerSearch.toLowerCase())));
  //     } else {
  //       this.listPartners = this.partners;
  //     }
  //   },
  // },
  
  methods: {
    // getPartners() {
    //   this.partnerService.getPartners().then((response) => {
    //     this.partners = response.data;
    //     console.log(this.partners)
    //   }).catch((e) => {
    //     console.log(e)
    //     this.makeToast('Erro de busca', 'Infelizmente houve um erro ao recuperar lista de parceiros, confira sua conexão com servidor e tente novamente', 'danger');
    //   });
    // },
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
