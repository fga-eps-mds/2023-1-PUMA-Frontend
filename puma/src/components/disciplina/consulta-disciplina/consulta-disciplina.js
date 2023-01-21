import SubjectService from '../../../services/SubjectService';
import ListaConsultaDisciplina from './ListaConsultaDisciplina/ListaConsultaDisciplina.vue';

export default {
  beforeMount() {
    this.getSubjects();
  },

  components: {
    ListaConsultaDisciplina,
  },

  data: () => ({
    subjectSearch: null,
    isLoading: false,
    wasLoaded: false,
    isDeletingSubject: false,
    subjects: [],
    mySubjects: [],
    subjectService: new SubjectService(),
  }),

  methods: {
    getSubjects() {
      this.$store.commit('OPEN_LOADING_MODAL', { title: 'Carregando...' });
      this.subjectService.getSubjects().then((response) => {
        this.subjects = response.data;
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.separateSubjects();
      }).catch(() => {
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('Erro de busca', 'Erro ao recuperar a lista de disciplinas, confira sua conexão com servidor e tente novamente', 'danger');
      });
    },
    separateSubjects() {
      this.subjects.map((sub) => {
        sub.professors.map((prof) => {
          if (prof.userid === this.$store.getters.user.userId) {
            this.mySubjects.push(sub);
            this.subjects = this.subjects.filter((item) => (
              item.subjectid !== sub.subjectid));
          }
          return prof;
        });
        return null;
      });
    },
    makeToast(toastTitle, toastMessage, toastVariant) {
      this.$bvToast.toast(toastMessage, {
        title: toastTitle, variant: toastVariant, solid: true, noAutoHide: 5000,
      });
    },
  },
};
