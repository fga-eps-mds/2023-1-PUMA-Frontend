import SubjectService from '../../../../services/SubjectService';

export default {
  props: {
    idDisciplina: Number,
  },

  beforeMount() {
    this.getSubject();
  },

  data() {
    return {
      subjectService: new SubjectService(),
      loading: false,
      error: null,
      disciplina: {},
    };
  },

  watch: {
    idDisciplina() {
      this.getSubject();
    },
  },

  methods: {
    async getSubject() {
      this.loading = true;

      this.subjectService.getSubjectById(this.idDisciplina).then((response) => {
        this.disciplina = response.data;

        this.loading = false;
      }).catch((error) => {
        this.error = error;
        this.loading = false;
      });
    },
  },
};
