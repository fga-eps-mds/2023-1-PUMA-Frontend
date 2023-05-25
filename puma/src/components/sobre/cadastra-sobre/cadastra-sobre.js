/* eslint-disable*/
import ReturnButton from '../../shared/ReturnButton/ReturnButton.vue';

export default {
  name: 'EditarSobre',
  components: {
    ReturnButton,
  },
  data() {
    return {
      description: '',
      methodology: '',
      goals: '',
      professorAlertShow: false,
      professorsSelected: [],
      professors: [],
      multiSelectPlaceholderProfessor: 'Carregando opções...',
      isLoadingProfessors: false,
      isTouchedProfessors: false,
      operacao: this.$route.path.split('/', 3)[2],
      imageSelected: '',
      imageError: false,
      isLoading: false,
    };
  },
  methods: {
    sortProfessorMultiselectLabels(value) {
      // eslint-disable-next-line
      if (value.filter((professor) => professor.userId === this.$store.getters.user.userId).length === 0) {
        // eslint-disable-next-line
        value.push(this.professors.filter((professor) => professor.userId === this.$store.getters.user.userId)[0]);
      }
      this.professorsSelected.sort((a, b) => b.fullName.length - a.fullName.length);
    },
    isProfessorChecked(option) {
      return this.professorsSelected.some((op) => op.userId === option.userId);
    },
  },
  handleImage(input) {
    if (input.files && input.files[0]) {
      if (input.files[0].size > 2000000) {
        this.imageError = true;
        return;
      }
      this.imageError = false;
      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageSelected = e.target.result;
      };

      reader.readAsDataURL(input.files[0]);
    }
  },
};