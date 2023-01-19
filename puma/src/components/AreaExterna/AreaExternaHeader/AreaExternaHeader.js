export default {
  props: {
    pagina: String,
  },

  data() {
    return {
      dispMenu: false,
    };
  },

  methods: {
    getDispMenu() {
      return this.dispMenu;
    },

    setDispMenu(value) {
      this.dispMenu = value;
    },
  },
};
