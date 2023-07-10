import AreaExternaHeader from './AreaExternaHeader/AreaExternaHeader.vue';
import Destaque from './Destaque/Destaque.vue';
import MelhoresProjetos from './MelhoresProjetos/MelhoresProjetos.vue';

export default {
  name: 'HomePage',
  components: {
    AreaExternaHeader,
    Destaque,
    MelhoresProjetos,
  },

  data() {
    return {
      pagina: '/home',
    };
  },
};
