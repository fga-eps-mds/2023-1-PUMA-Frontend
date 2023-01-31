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

      subjectForm: '',
      codeForm: '',
      yearForm: '',
      semesterForm: '',
      listScheduleForm: [],
      dayScheduleForm: '',
      startScheduleForm: '',
      endScheduleForm: '',
      teachersForm: [],
      passwordForm: '',
      classId: this.$route.params.classid,

      dispSelectSubject: false,
      dispSelectSemester: false,
      dispSelectDay: false,
      dispSelectProfessor: false,

      listDays: [
        { value: 'Segunda-feira' },
        { value: 'Terça-feira' },
        { value: 'Quarta-feira' },
        { value: 'Quinta-feira' },
        { value: 'Sexta-feira' },
        { value: 'Sábado' },
      ],
      listSemesters: [
        { name: '1°', value: '1' },
        { name: '2°', value: '2' },
        { name: 'Verão', value: 'VERAO' },
      ],

      enableSendBtn: false,
    };
  },
  /* eslint-disable no-empty-function */
  async mounted() {
  },
  methods: {
    getClasses() {
      if (this.classId !== '0') {
        this.classService.getClassById(this.classid).then((response) => {
          for (let i = 0; i < this.mySubjects.length;) {
            if (this.mySubjects[i].subjectid === response.data.classItem.class.subjectid) {
              this.subjectForm = this.mySubjects[i];
            }
            i += 1;
          }
          /* eslint-disable-next-line */
          this.codeForm = response.data.classItem.class.classcode.substring(1, response.data.classItem.class.classcode.length);
          this.yearForm = response.data.classItem.class.year;
          this.semesterForm = response.data.classItem.class.semester;

          for (let i = 0; i < response.data.classItem.teachers.length;) {
            this.teachersForm.push(response.data.classItem.teachers[i].userid);
            i += 1;
          }

          for (let i = 0; i < response.data.classItem.schedules.length;) {
            this.listScheduleForm.push({
              day: response.data.classItem.schedules[i].day,
              start: response.data.classItem.schedules[i].start,
              end: response.data.classItem.schedules[i].finish,
              dispSelectDay: false,
            });
            i += 1;
          }
          this.passwordForm = response.data.classItem.class.password;
        });
      }
    },
    validateForm() {
      if (this.subjectForm.subjectid !== undefined
          && this.codeForm !== undefined
          && this.codeForm !== ''
          && this.yearForm !== undefined
          && this.yearForm !== ''
          && Number(this.yearForm) > 1949
          && Number(this.yearForm) < 3001
          && this.semesterForm !== undefined
          && this.semesterForm !== ''
          && this.passwordForm !== undefined
          && this.passwordForm.length === 6
          && this.passwordForm !== ''
          && this.teachersForm.length > 0
          && this.listScheduleForm.length > 0) {
        const regex = /\W/;
        if (!(regex.test(this.passwordForm))) {
          this.enableSendBtn = true;
        } else {
          this.enableSendBtn = false;
        }
      } else {
        this.enableSendBtn = false;
      }
    },
    setSubjectForm(value) {
      this.subjectForm = value;
      this.teachersForm = [];
      this.validateForm();
    },
    setSemesterForm(value) {
      this.semesterForm = value;
      this.validateForm();
    },
    setDayForm(value) {
      this.dayScheduleForm = value;
      this.validateForm();
    },
    setProfessorForm(professor, select) {
      if (this.teachersForm.includes(professor)) {
        const teachersForm = [];
        for (let i = 0; i < this.teachersForm.length;) {
          if (this.teachersForm[i] !== professor) {
            teachersForm.push(this.teachersForm[i]);
          }
          i += 1;
        }
        this.teachersForm = teachersForm;
        if (select) {
          this.dispSelectProfessor = !this.dispSelectProfessor;
        }
      } else {
        this.teachersForm.push(professor);
      }
      this.validateForm();
    },
    getProfessorForm(professor) {
      for (let i = 0; i < this.teachersForm.length;) {
        if (this.teachersForm[i] === professor) {
          return true;
        }
        i += 1;
      }
      return false;
    },
    addDay() {
      const item = {
        day: this.dayScheduleForm,
        start: this.startScheduleForm,
        end: this.endScheduleForm,
        dispSelectDay: false,
      };
      this.listScheduleForm.push(item);
      this.dayScheduleForm = '';
      this.startScheduleForm = '';
      this.endScheduleForm = '';
      this.validateForm();
    },
    removeDay(item) {
      const listScheduleForm = [];
      for (let i = 0; i < this.listScheduleForm.length;) {
        if (this.listScheduleForm[i] !== item) {
          listScheduleForm.push(this.listScheduleForm[i]);
        }
        i += 1;
      }
      this.listScheduleForm = listScheduleForm;
      this.validateForm();
    },
    setDayItemForm(day, index) {
      this.listScheduleForm[index].day = day;
    },
    formatSemester() {
      switch (this.semesterForm) {
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
    getSubjects() {
      this.$store.commit('OPEN_LOADING_MODAL', { title: 'Carregando...' });
      this.subjectService.getSubjects().then((response) => {
        this.subjects = response.data;
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.separateSubjects();
        this.getClasses();
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
    async onSubmit() {
      const regex = /\W/;
      if (this.codeForm === undefined || this.codeForm === '') {
        this.makeToast('ERRO', 'Código da disciplina não informado', 'danger');
        return;
      }
      if (this.yearForm === undefined || this.yearForm === '' || Number(this.yearForm) < 1950 || Number(this.yearForm) > 3000) {
        this.makeToast('ERRO', 'Ano da disciplina não informado', 'danger');
        return;
      }
      if (this.passwordForm === undefined || this.passwordForm === '' || this.passwordForm.length !== 6 || regex.test(this.passwordForm)) {
        this.makeToast('ERRO', 'Senha inválida', 'danger');
        return;
      }
      if (!this.enableSendBtn) {
        this.makeToast('ERRO', 'Existem campos inválidos ou não preenchidos no formulário', 'danger');
        return;
      }

      try {
        const classItem = {
          classItem: {
            subjectId: this.subjectForm.subjectid,
            classCode: `T${this.codeForm}`,
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
          if (this.$route.params.classid === '0') {
            this.makeToast('SUCESSO', 'Turma criada com sucesso', 'success');
          } else {
            this.makeToast('SUCESSO', 'Turma atualizada com sucesso', 'success');
          }
          this.$store.commit('CLOSE_LOADING_MODAL');
          window.location.href = '/turmas';
        }).catch(() => {
          this.isLoading = false;
          if (this.$route.params.classid === '0') {
            this.makeToast('ERRO', 'Infelizmente houve um erro ao criar a turma. Verifique se ela não existe', 'danger');
          } else {
            this.makeToast('ERRO', 'Infelizmente houve um erro ao atualizar a turma', 'danger');
          }
          this.$store.commit('CLOSE_LOADING_MODAL');
        });
      } catch (error) {
        this.$store.commit('CLOSE_LOADING_MODAL');
      }
    },
    makeToast(title, message, variant) {
      this.$bvToast.toast(message, {
        title, variant, solid: true, autoHideDelay: 4000,
      });
    },
  },
};
