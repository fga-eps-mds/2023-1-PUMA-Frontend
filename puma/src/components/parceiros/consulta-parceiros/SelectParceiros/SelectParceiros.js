/* eslint-disable */
import ReturnButton from '../../../shared/ReturnButton/ReturnButton.vue';
import PartnerService from '../../../../services/PartnerService';

export default {
  props: {
    title: String,
    dataSubjects: Array,
    subjectSearch: String,
  },
  name: 'DestacaParceiros',
  components: {
    ReturnButton,
  },
  data () {
    return {
      partnerService: new PartnerService(),
      partners: [],
      listSubjects: [],
      initialPartners: [],
    }
  },

  beforeMount() {
    this.getPartners();
  },
  methods: {
    getPartners() {
      this.partnerService.getPartners().then((response) => {
        this.partners = response.data;
        this.partners.forEach(item => {
          let obj = {
            partnerId: item.partnerId,
            showOnHome: item.showOnHome,
          }
          this.initialPartners.push(obj);
        });
      }).catch((e) => {
        console.log(e)
        this.makeToast('Erro de busca', 'Infelizmente houve um erro ao recuperar lista de parceiros, confira sua conexão com servidor e tente novamente', 'danger');
      });
    },
    partnerDetail(id) {
      this.$router.push({ path: `/parceiros/detalhes/${id}` });
    },
    async editPartner() {
      let changedObjs = [];
      this.partners.forEach(item => {
        const obj = this.initialPartners.find(e => e.partnerId === item.partnerId);
        if(obj){
          if(item.showOnHome !== obj.showOnHome) {
            changedObjs.push(item)
          }
        }
      });
      console.log(changedObjs)
      for(const item of changedObjs ) {
        try {
          await this.partnerService.updatePartners(item.partnerId, {showOnHome: item.showOnHome})
        } catch (error) {
          console.log(error)
          this.makeToast('Falha', `Falha ao destacar os projetos`, 'danger'); 
        }
      }
      this.makeToast('Sucesso', `O projetos foram destacados com sucesso`, 'success');
    },
    makeToast(title, message, variant) {
      this.$bvToast.toast(message, {
        title, variant, solid: true, noAutoHide: true, appendToast: true,
      });
    },
  },
};
