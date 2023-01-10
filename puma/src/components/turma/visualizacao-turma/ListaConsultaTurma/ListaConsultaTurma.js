import ClassService from '../../../../services/ClassService';
import SubjectService from '../../../../services/SubjectService';

export default {
  beforeMount() {
    this.getData();
  },

  props: {
    mySubjects: Boolean,
    subjectSearch: String,
    dispMySubjects: Boolean,
    listYears: Array,
    listSemesters: Array,
  },

  data: () => ({
    listSubjects: [],
    listClassesEditable: [],
    listClasses: [],
    classService: new ClassService(),
    subjectService: new SubjectService(),
  }),

  created() {
    this.$watch('listYears', (after) => {
      after.filter(() => {
        this.filter();
        return null;
      });
    }, { deep: true });

    this.$watch('listSemesters', (after) => {
      after.filter(() => {
        this.filter();
        return null;
      });
    }, { deep: true });
  },

  watch: {
    deep: true,
    dispMySubjects() {
      this.filter();
    },
    subjectSearch() {
      this.filter();
    },
  },

  methods: {
    filter() {
      this.listClassesEditable = this.listClasses;

      if (this.subjectSearch) {
        this.listClassesEditable = this.listClasses.filter((item) => (
          item.subject.name.toLowerCase().includes(this.subjectSearch.toLowerCase())));
      }

      let listClassesEditable = [];
      if (this.dispMySubjects) {
        listClassesEditable = [];
        this.listClassesEditable.map((sub) => {
          sub.subject.professors.map((prof) => {
            if (prof.userid === this.$store.getters.user.userId) {
              listClassesEditable.push(sub);
            }
            return null;
          });
          return null;
        });
        this.listClassesEditable = listClassesEditable;
      }

      let listSemester = [];
      let listYear = [];
      for (let i = 0; i < this.listSemesters.length;) {
        if (this.listSemesters[i].selected) {
          listSemester.push(this.listSemesters[i].value);
        }
        i += 1;
      }
      for (let i = 0; i < this.listYears.length;) {
        if (this.listYears[i].selected) {
          listYear.push(this.listYears[i].date);
        }
        i += 1;
      }
      if (listSemester.length > 0) {
        listClassesEditable = [];
        this.listClassesEditable.map((sub) => {
          listSemester.map((semester) => {
            if (semester === sub.semester) {
              listClassesEditable.push(sub);
            }
            return null;
          });
          return null;
        });
        this.listClassesEditable = listClassesEditable;
      }

      listSemester = [];
      if (listYear.length > 0) {
        listClassesEditable = [];
        this.listClassesEditable.map((sub) => {
          listYear.map((year) => {
            if (year === sub.year) {
              listClassesEditable.push(sub);
            }
            return null;
          });
          return null;
        });
        this.listClassesEditable = listClassesEditable;
      }
      listYear = [];
    },
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
