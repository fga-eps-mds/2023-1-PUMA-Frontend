export default {
  props: {
    title: String,
    dataContacts: Array,
    contactsSearch: String,
  },

  data: () => ({
    listContacts: [],
  }),

  watch: {
    dataContacts() {
      this.listContacts = this.dataContacts;
    },

    contactsSearch() {
      if (this.contactsSearch) {
        this.listContacts = this.dataContacts.filter((item) => (
          item.name.toLowerCase().includes(this.contactsSearch.toLowerCase())));
      } else {
        this.listContacts = this.dataContacts;
      }
    },
  },

  methods: {
    goToContact(id) {
      this.$router.push({ path: `/infoContatos/visualizar/${id}` });
    },
  },
};
