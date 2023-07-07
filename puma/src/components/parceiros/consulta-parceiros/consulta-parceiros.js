/* eslint-disable */
import SubjectService from '../../../services/SubjectService';
import PartnerService from '../../../services/PartnerService';
import ListaParceiros from './ListaParceiros/ListaParceiros.vue';

export default {

  beforeMount() {
    this.getPartners();
  },

  components: {
    ListaParceiros,
  },

  data: () => ({
    subjectSearch: null,
    isLoading: false,
    wasLoaded: false,
    isDeletingSubject: false,
    subjects: [],
    mySubjects: [],
    partnerService: new PartnerService(),
    partners: [],
    listSubjects: [],
    subjectService: new SubjectService(),
  }),

  methods: {
    getPartners() {
      this.partnerService.getPartners().then((response) => {
        this.partners = response.data;
        console.log(this.partners)
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
