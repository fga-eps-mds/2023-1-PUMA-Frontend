import SubjectService from '../../../services/SubjectService';
import ClassService from '../../../services/ClassService';
import ListaConsultaTurma from './ListaConsultaTurma/ListaConsultaTurma.vue';

export default {
  beforeMount() {
    this.getData();
  },

  components: {
    ListaConsultaTurma,
  },

  data: () => ({
    subjectSearch: null,
    isLoading: false,
    wasLoaded: false,
    isDeletingSubject: false,
    subjects: [],
    mySubjects: [],
    listClasses: [],
    subjectService: new SubjectService(),

    classService: new ClassService(),
    dispMySubjects: false,
    dispTimeFIlter: false,
    listYears: [
      { date: 2023, selected: false },
      { date: 2022, selected: false },
      { date: 2021, selected: false },
      { date: 2020, selected: false },
    ],
    listSemesters: [
      { name: '1°', selected: false },
      { name: '2°', selected: false },
      { name: 'Verão', selected: false },
    ],
  }),

  methods: {
    getData() {
      this.$store.commit('OPEN_LOADING_MODAL', { title: 'Carregando...' });
      this.subjectService.getSubjects().then((response) => {
        this.subjects = response.data;

        this.classService.getClasses().then((res) => {
          this.listClasses = res.data;
          console.log(this.listClasses);
          this.$store.commit('CLOSE_LOADING_MODAL');
        });
      }).catch(() => {
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('ERRO', 'Erro ao recuperar disciplinas', 'danger');
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
        title: toastTitle, variant: toastVariant, solid: true, autoHideDelay: 4000,
      });
    },
  },
};
