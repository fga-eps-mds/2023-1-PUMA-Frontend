/* eslint-disable */
import AreaExternaHeader from '../AreaExternaHeader/AreaExternaHeader.vue';
import PumaInfoService from '../../../services/PumaInfoService';
import UserService from '../../../services/UserService';

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
      userService: new UserService(),
      pumaInfoService: new PumaInfoService(),
      pumaMoreInfos: [],
      professors: [],
      description: '',
      goal: '',
      methodology: '',
      goalImage: '',
      methodologyImage: '',
      descriptionImage: '',
      titleDescription: '',
      titleMethodology: '',
      titleGoal: '',
      titleTeachers: '',
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
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA", response)
        this.pumaInfos = response.data;
        
        this.titleDescription = response.data['0'].titleDescription;
        this.description = response.data['0'].description;
        this.descriptionImage = response.data['0'].descriptionImage;
        this.titleGoal = response.data['0'].titleGoal;
        this.goal = response.data['0'].goal;
        this.goalImage = response.data['0'].goalImage;
        this.titleMethodology = response.data['0'].titleMethodology;
        this.methodology = response.data['0'].methodology;
        this.methodologyImage = response.data['0'].methodologyImage;
        this.pumaMoreInfos = response.data.moreInfos;
        this.professors = response.data.teachers;
        console.log("FJSDLÇFKSLÇDFKF", this.professors);
        this.titleTeachers = response.data['0'].titleTeachers;
      }).catch((e) => {
        console.log(e);
      });
    },
  },
};
