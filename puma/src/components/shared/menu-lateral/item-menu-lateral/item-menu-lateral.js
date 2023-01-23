export default {
  name: 'ItemMenuLateral',
  props: {
    props: { type: Object },
  },
  data() {
    return {
      selected: this.$route.path?.includes(this.props.basePath),
      hasAccess: this.props.show(),
    };
  },
  methods: {
    update() {
      if (this.$route.path?.includes(this.props.basePath)) {
        this.selected = true;
        document.title = `PUMA | ${this.props.title}`;
      } else {
        this.selected = false;
      }
    },
  },
  created() {
    this.update();
  },
  watch: {
    // '$route.path': function () {
    //   this.update();
    // },
  },
};
