import ClassService from '../../../../services/ClassService';
import SubjectService from '../../../../services/SubjectService';

export default {
  beforeMount() {
    this.getData();
  },

  props: {
    mySubjects: Boolean,
    subjectSearch: String,
  },

  data: () => ({
    listSubjects: [],
    listClassesEditable: [],
    listClasses: [],
    classService: new ClassService(),
    subjectService: new SubjectService(),
  }),

  watch: {
    subjectSearch() {
      if (this.subjectSearch) {
        this.listClassesEditable = this.listClasses.filter((item) => (
          item.subject.name.toLowerCase().includes(this.subjectSearch.toLowerCase())));
      } else {
        this.listClassesEditable = this.listClasses;
      }
    },
  },

  methods: {
    goToSubject(id) {
      this.$router.push({ path: `/turma/${id}` });
    },
    formatSemester(semester) {
      switch (semester) {
        case '1':
          return '1°';
        case '2':
          return '2°';
        case 'VERAO':
          return 'Verão';
        default:
          return '-';
      }
    },
    getData() {
      this.$store.commit('OPEN_LOADING_MODAL', { title: 'Carregando...' });
      this.subjectService.getSubjects().then((response) => {
        this.listSubjects = response.data;
        this.classService.getClasses().then((res) => {
          this.listClasses = res.data;
          for (let i = 0; i < this.listClasses.length;) {
            for (let j = 0; j < this.listSubjects.length;) {
              if (this.listSubjects[j].subjectid === this.listClasses[i].subjectid) {
                this.listClasses[i].subject = this.listSubjects[j];
                break;
              }
              j += 1;
            }
            i += 1;
          }
          this.listClassesEditable = this.listClasses;
          this.$store.commit('CLOSE_LOADING_MODAL');
        });
      }).catch(() => {
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('ERRO', 'Erro ao recuperar turmas', 'danger');
      });
    },
    makeToast(toastTitle, toastMessage, toastVariant) {
      this.$bvToast.toast(toastMessage, {
        title: toastTitle, variant: toastVariant, solid: true, autoHideDelay: 4000,
      });
    },
  },
};
