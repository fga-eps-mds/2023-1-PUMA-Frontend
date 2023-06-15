import AreaExternaHeader from './AreaExternaHeader/AreaExternaHeader.vue';
import Destaque from './Destaque/Destaque.vue';

export default {
  name: 'HomePage',
  components: {
    AreaExternaHeader,
    Destaque,
  },

  data() {
    return {
      pagina: '/home',
    };
  },
};
