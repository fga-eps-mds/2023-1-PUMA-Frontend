import UserService from '../../services/UserService';
import TeacherCard from './TeacherCard/TeacherCard.vue';

export default {
  name: 'NewTeachers',

  components: {
    TeacherCard,
  },

  data() {
    return {
      userService: new UserService(),
      teachers: [],
    };
  },

  async mounted() {
    try {
      this.$store.commit('OPEN_LOADING_MODAL', { title: 'Carregando...' });
      await this.getTeachers();
      this.$store.commit('CLOSE_LOADING_MODAL');
    } catch (error) {
      this.$store.commit('CLOSE_LOADING_MODAL');
    }
  },

  methods: {
    getTeachers() {
      return new Promise((resolve, reject) => {
        this.userService.getPendingTeachers().then((response) => {
          this.teachers = response.data.teachers;
          resolve();
        }).catch(() => {
          this.makeToast('Erro de busca', 'Infelizmente houve um erro ao recuperar a lista de professores com cadastro pendente, confira sua conexão com servidor e tente novamente', 'danger');
          reject();
        });
      });
    },
  },
};
