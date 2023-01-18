import AreaExternaHeader from '../AreaExternaHeader/AreaExternaHeader.vue';
import ListaDisciplina from './ListaDisciplina/ListaDisciplina.vue';

export default {
  components: {
    AreaExternaHeader,
    ListaDisciplina,
  },

  data() {
    return {
      paginaAtual: '/home/disciplinas',
    };
  },
};
