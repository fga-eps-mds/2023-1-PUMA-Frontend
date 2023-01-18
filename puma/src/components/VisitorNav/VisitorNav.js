export default {
  name: 'VisitorNav',
  props: {
    navs: { type: Array },
  },

  methods: {
    goToPage(title) {
      if (title === 'Login' && this.$route.path.slice(1) !== 'login') {
        this.$router.push({ path: '/login' });
      } else if (title === 'Home') {
        this.$router.push({ path: '/' });
      }
    },
  },
};
