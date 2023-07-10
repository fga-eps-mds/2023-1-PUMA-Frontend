/* eslint-disable */
import PumaInfoService from '../../../../services/PumaInfoService';
import ReturnButton from '../../../shared/ReturnButton/ReturnButton.vue';

export default {
  beforeMount() {
    this.getPuma_Infos();
  },
  name: 'CadastroContato',
  components: {
    ReturnButton,
  },
  data: () => ({
    title: '',
    description: '',
    pumaInfo: [],
    pumaInfoService: new PumaInfoService(),
  }),

  methods: {
    async getPuma_Infos(){
      this.id = this.$route.params.id;
      await this.pumaInfoService.getPuma_Infos(this.id).then((response) => {
        this.pumaInfo = response.data
        console.log('Item', response.data)
        this.pumaMoreInfos = response.data.moreInfos
      }).catch((e) => {
        console.log(e);
      });
    },

    async onSubmit() {
      console.log("QAULQEUR COISa", this.pumaInfo)
      try {
        const moreInfo = { 
          infoId: 1,
          title: this.title,
          description: this.description,
        };

        const pumaMoreInfos = this.pumaInfo.moreInfos;
        pumaMoreInfos.push(moreInfo)
        console.log("PUMAAAAAAAAAAAAAAAAAAAAAAAA", pumaMoreInfos)
        const teachers = this.pumaInfo.teachers;
        const topics = this.pumaInfo.topics;
        const pumaItem = this.pumaInfo['0'];
        const newObj = {
          pumaItem: pumaItem,
          topics: topics,
          moreInfos: pumaMoreInfos,
          teachers: teachers,
        };
        console.log('object', newObj)
        await this.pumaInfoService.updatePuma_Info(newObj);

        this.makeToast('Saiba mais cadastrado', `O saiba mais "${moreInfo.title}" foi cadastrado com sucesso`, 'success');
        await this.$router.push({ path: `/sobre/` });
      } catch (error) {
        console.log(error)
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('Falha ao cadastrar', 'Infelizmente houve um erro ao cadastrar o saiba mais. Confira sua conexão com servidor e tente novamente', 'danger');
      }
    },
    makeToast(title, message, variant) {
      this.$bvToast.toast(message, {
        title, variant, solid: true, noAutoHide: true, appendToast: true,
      });
    },
  },
};
