import statusProjetoEnum from '../../../../utils/enums/status-projeto.enum';

export default {
  mixins: [statusProjetoEnum],

  props: {
    operacao: String,
    dataProjects: Array,
    projectSearch: String,
  },

  data: () => ({
    listProjects: [],
  }),

  watch: {
    dataProjects() {
      this.listProjects = this.dataProjects;
    },

    projectSearch() {
      if (this.projectSearch) {
        this.listProjects = this.dataProjects.filter((item) => (
          item.name.toLowerCase().includes(this.projectSearch.toLowerCase())));
      } else {
        this.listProjects = this.dataProjects;
      }
    },
  },

  methods: {
    goToProject(id) {
      if (this.operacao === 'meus-projetos') {
        this.$router.push({ path: `/meus-projetos/visualizar/${id}` });
      } else {
        this.$router.push({ path: `/projetos-disciplina/visualizar/${id}` });
      }
    },
  },
};
