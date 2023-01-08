/* eslint-disable */
/* eslint-disable prefer-destructuring */
import SubjectService from '../../../services/SubjectService';
import ClassService from '../../../services/ClassService';
import ReturnButton from '../../shared/ReturnButton/ReturnButton.vue';

export default {
  name: 'EdicaoTurma',

  beforeMount() {
    this.getSubjects();
  },

  components: {
    ReturnButton,
  },
  data() {
    return {
      classService: new ClassService(),
      subjects: [],
      subjectService: new SubjectService(),
      mySubjects: [],

      subjectForm: "",
      codeForm: "",
      yearForm: "",
      semesterForm: "1",
      listScheduleForm: [],
      dayScheduleForm: "Segunda-feira",
      startScheduleForm: "",
      endScheduleForm: "",
      teachersForm: [],
      passwordForm: "",
    };
  },
  async mounted() {
  },
  methods: {
    getSubjects() {
      this.$store.commit('OPEN_LOADING_MODAL', { title: 'Carregando...' });
      this.subjectService.getSubjects().then((response) => {
        this.subjects = response.data;
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.separateSubjects();
      }).catch((err) => {console.log(err);
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
    async onSubmit() {
      try {
          const classItem = {
            classItem: {
              subjectId: this.subjectForm.subjectid,
              classCode: this.codeForm,
              year: this.yearForm,
              semester: this.semesterForm,
              password: this.passwordForm,
              classesTeacher: this.teachersForm,
              classesSchedule: this.listScheduleForm,
              classid: this.$route.params.classid,
            },
          };
          this.classService.updateClass(this.$route.params.classid, classItem).then(async () => {
            this.isLoading = false;
            await this.$router.push({ name: 'Visualização de Turmas' });
            this.makeToast('SUCESSO', 'Turma atualizada com sucesso', 'success');
            this.$store.commit('CLOSE_LOADING_MODAL');
          }).catch((error) => {
            this.isLoading = false;
            this.makeToast('ERRO', 'Infelizmente houve um erro ao atualizar a turma', 'danger');
            this.$store.commit('CLOSE_LOADING_MODAL');
          });
      } catch (error) {
        this.$store.commit('CLOSE_LOADING_MODAL');
      }
    },
    makeToast: function (title, message, variant) {
      this.$bvToast.toast(message, { title: title, variant: variant, solid: true, autoHideDelay: 4000 });
    },
  },
};
