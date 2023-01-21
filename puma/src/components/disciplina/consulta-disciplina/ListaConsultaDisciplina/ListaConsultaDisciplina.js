export default {
  props: {
    title: String,
    dataSubjects: Array,
    subjectSearch: String,
  },

  data: () => ({
    listSubjects: [],
  }),

  watch: {
    dataSubjects() {
      this.listSubjects = this.dataSubjects;
    },

    subjectSearch() {
      if (this.subjectSearch) {
        this.listSubjects = this.dataSubjects.filter((item) => (
          item.name.toLowerCase().includes(this.subjectSearch.toLowerCase())));
      } else {
        this.listSubjects = this.dataSubjects;
      }
    },
  },

  methods: {
    goToSubject(id) {
      this.$router.push({ path: `/disciplinas/visualizar/${id}` });
    },
  },
};
