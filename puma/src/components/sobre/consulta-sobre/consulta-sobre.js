import PumaInfoService from '../../../services/PumaInfoService';

export default {
  beforeMount() {
    this.getPuma_Infos();
    this.getPuma_MoreInfos();
  },

  data: () => ({
    pumaInfos: [],
    pumaInfoService: new PumaInfoService(),
    pumaMoreInfos: [],
  }),

  methods: {
    getPuma_Infos() {
      this.pumaInfoService.getPuma_Infos().then((response) => {
        this.pumaInfos = response.data;
      }).catch((e) => {
        console.log(e);
      });
    },
    getPuma_MoreInfos() {
      this.pumaInfoService.getPuma_Infos().then((response) => {
        response.data.moreInfos.forEach((e) => {
          const obj = {
            title: e.title,
            description: e.description,
          };
          this.pumaMoreInfos.push(obj);
        });
      }).catch((e) => {
        console.log(e);
      });
    },
  },
};
