export default {
  props: {
    title: String,
    dataUserType: Array,
    userTypeSearch: String,
  },

  data: () => ({
    listUserType: [],
  }),

  watch: {
    dataUserType() {
      this.listUserType = this.dataUserType;
    },

    userTypeSearch() {
      if (this.userTypeSearch) {
        this.listUserType = this.dataUserType.filter((item) => (
          item.name.toLowerCase().includes(this.userTypeSearch.toLowerCase())));
      } else {
        this.listUserType = this.dataUserType;
      }
    },
  },

  methods: {
    goToSubject(id) {
      this.$router.push({ path: `/usuarios/visualizar/${id}` });
    },
  },
};
