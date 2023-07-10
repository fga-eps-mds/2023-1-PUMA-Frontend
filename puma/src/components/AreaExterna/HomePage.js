/* eslint-disable */
import AreaExternaHeader from './AreaExternaHeader/AreaExternaHeader.vue';
import Destaque from './Destaque/Destaque.vue';
import MelhoresProjetos from './MelhoresProjetos/MelhoresProjetos.vue';
import Parceiros from '../parceiros/parceiros-home/homeParceiro.vue';

export default {
  name: 'HomePage',
  components: {
    AreaExternaHeader,
    Destaque,
    MelhoresProjetos,
    Parceiros,
  },

  data() {
    return {
      pagina: '/home',
    };
  },
};
