/* eslint-disable */
/* eslint-disable prefer-destructuring */
import ClassService from '../../../services/ClassService';
import ReturnButton from '../../shared/ReturnButton/ReturnButton.vue';

export default {
  name: 'EdicaoTurma',
  components: {
    ReturnButton,
  },
  data() {
    return {
      classService: new ClassService(),
    };
  },
  async mounted() {
  },
  methods: {
    async onSubmit() {
      try {
          const classItem = {
            classItem: {
              name: this.name,
            },
          };
          classItem.classItem.classid = parseInt(this.$route.params.classid, 10);
          this.classService.updateClass(this.$route.params.id, classItem).then(async () => {
            this.isLoading = false;
            await this.$router.push({ name: 'Disciplinas' });
            this.makeToast('SUCESSO', 'Disciplina atualizada com sucesso', 'success');
            this.$store.commit('CLOSE_LOADING_MODAL');
          }).catch((error) => {
            this.isLoading = false;
            this.makeToast('ERRO', 'Infelizmente houve um erro ao atualizar a disciplina', 'danger');
            this.$store.commit('CLOSE_LOADING_MODAL');
          });
      } catch (error) {
        this.$store.commit('CLOSE_LOADING_MODAL');
      }
    },
    makeToast: function (title, message, variant) {
      this.$bvToast.toast(message, { title: title, variant: variant, solid: true, autoHideDelay: 4000 });
    },
  },
};
