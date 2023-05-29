import AreaExternaHeader from '../AreaExternaHeader/AreaExternaHeader.vue';
import PumaInfoService from '../../../services/PumaInfoService';

export default {
  components: {
    AreaExternaHeader,
  },

  beforeMount() {
    this.getPuma_Infos();
  },
  data() {
    return {
      paginaAtual: '/home/sobre',
      pumaInfos: [],
      pumaInfoService: new PumaInfoService(),
      pumaMoreInfos: [],
      description: '',
      goal: '',
      methodology: '',
      goalImage: '',
      methodologyImage: '',
    };
  },

  methods: {
    showInformacao(element) {
      const content = document.getElementById(element);

      if (!content.style.display) {
        content.style.display = 'block';
      } else if (content.style.display === 'block') {
        content.style.display = 'none';
      } else {
        content.style.display = 'block';
      }
    },
    getPuma_Infos() {
      this.pumaInfoService.getPuma_Infos().then((response) => {
        this.pumaInfos = response.data;
        this.description = response.data['0'].description;
        this.goal = response.data['0'].goal;
        this.goalImage = response.data['0'].goalImage;
        this.methodology = response.data['0'].methodology;
        this.methodologyImage = response.data['0'].methodologyImage;
        this.pumaMoreInfos = response.data.moreInfos;
      }).catch((e) => {
        console.log(e);
      });
    },
  },
};
