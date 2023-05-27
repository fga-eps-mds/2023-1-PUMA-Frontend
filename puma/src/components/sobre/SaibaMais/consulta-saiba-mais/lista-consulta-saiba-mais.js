import PumaInfoService from '../../../../services/PumaInfoService';

export default {
  beforeMount() {
    this.getPuma_Infos();
  },

  data: () => ({
    pumaInfos: [],
    pumaInfoService: new PumaInfoService(),
  }),

  methods: {
    getPuma_Infos() {
      this.pumaInfoService.getPuma_Infos().then((response) => {
        this.pumaInfos = response.data;
        console.log('responsedata');
        console.log(response.data);
      }).catch((e) => {
        console.log(e);
      });
    },
  },
};
