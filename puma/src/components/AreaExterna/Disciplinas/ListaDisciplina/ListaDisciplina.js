import ObjetoDisciplina from '../ObjetoDisciplina/ObjetoDisciplina.vue';

import SubjectService from '../../../../services/SubjectService';

export default {
  components: {
    ObjetoDisciplina,
  },

  data() {
    return {
      disciplinaAtual: {},
      listaDisciplinas: [],
      loading: false,
      error: null,
      subjectService: new SubjectService(),
    };
  },

  beforeMount() {
    this.getSubjects();
  },

  methods: {
    async getSubjects() {
      this.loading = true;
      this.subjectService.getSubjects().then((response) => {
        this.listaDisciplinas = response.data;

        const disciplina = this.listaDisciplinas[0];
        this.disciplinaAtual = disciplina;

        this.loading = false;
      }).catch((error) => {
        this.error = error;
        this.loading = false;
      });
    },
    alterarShowSelectDisciplina(event, disciplina) {
      const li = event.target;
      const filhos = document.querySelectorAll('#tabela-listagem-disciplina > *');

      this.disciplinaAtual = disciplina;

      for (let i = 0; i < filhos.length; i += 1) {
        filhos[i].style.backgroundColor = '#ffffff';
        filhos[i].style.color = '#000000';
      }

      li.style.backgroundColor = '#15355e';
      li.style.color = '#ffffff';
    },
  },
};
