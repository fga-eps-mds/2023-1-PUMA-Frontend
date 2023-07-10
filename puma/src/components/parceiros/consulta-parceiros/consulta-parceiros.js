/* eslint-disable */
import SubjectService from '../../../services/SubjectService';
import PartnerService from '../../../services/PartnerService';
import ListaParceiros from './ListaParceiros/ListaParceiros.vue';
import ReturnButton from '../../shared/ReturnButton/ReturnButton.vue';

export default {
  name: 'ConsultaParceiros',
  components: {
    ReturnButton,
    ListaParceiros,
  },
  beforeMount() {
    this.getPartners();
  },

  data: () => ({
    partnerSearch: null,
    isLoading: false,
    wasLoaded: false,
    isDeletingSubject: false,
    subjects: [],
    mySubjects: [],
    partnerService: new PartnerService(),
    partners: [],
    listPartners: [],
    subjectService: new SubjectService(),
  }),

  watch: {
    partnerSearch() {
      this.filterPartners();
    }
  },

  methods: {
    filterPartners() {
      if (!this.partnerSearch) {
        this.listPartners = this.partners;
      } else {
        this.listPartners = this.partners.filter(item =>
          item.name.toLowerCase().includes(this.partnerSearch.toLowerCase())
        );
      }
    },
    getPartners() {
      this.partnerService.getPartners().then((response) => {
        this.partners = response.data;
        this.listPartners = this.partners
      }).catch((e) => {
        console.log(e)
        this.makeToast('Erro de busca', 'Infelizmente houve um erro ao recuperar lista de parceiros, confira sua conexão com servidor e tente novamente', 'danger');
      });
    },
    makeToast(toastTitle, toastMessage, toastVariant) {
      this.$bvToast.toast(toastMessage, {
        title: toastTitle, variant: toastVariant, solid: true, noAutoHide: 5000,
      });
    },
  },
};
