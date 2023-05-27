/* eslint-disable*/
import ReturnButton from '../../shared/ReturnButton/ReturnButton.vue';
import SubjectService from '../../../services/SubjectService';

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
          subjectService: new SubjectService(),
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
  validateMultiselects() {
    this.isTouchedKeywords = true;
    this.isTouchedProfessors = true;
    this.isTouchedSubareas = true;
    return (
      !!this.keywordsSelected.length
      || !!this.subareasSelected.length
      || !!this.professorsSelected.length
    );
  },
  isChecked(option) {
    return this.keywordsSelected.some((op) => op.keyword === option.keyword);
  },
  isSubareaChecked(option) {
    return this.subareasSelected.some((op) => op.subAreaId === option.subAreaId);
  },
  isProfessorChecked(option) {
    return this.professorsSelected.some((op) => op.userId === option.userId);
  },
  getProfessors() {
    this.isLoadingProfessors = true;
    return new Promise((resolve, reject) => {
      this.subjectService.getProfessors().then((response) => {
        this.professors = response.data;
        // eslint-disable-next-line
        this.professorsSelected.push(response.data.filter((professor) => professor.userId === this.$store.getters.user.userId));
        this.isLoadingProfessors = false;
        this.multiSelectPlaceholderProfessor = this.professors.length ? 'Selecione os professores que deseja adicionar' : 'Sem professores disponíveis';
        resolve();
      }).catch(() => {
        this.isLoadingProfessors = false;
        this.multiSelectPlaceholderProfessor = 'Sem professores disponíveis';
        this.makeToast('Erro de busca', 'Infelizmente houve um erro ao recuperar a lista de professores disponíveis, confira sua conexão com servidor e tente novamente', 'danger');
        reject();
      });
    });
  },
  async onSubmit() {
    try {
      const isFormValid = await this.$refs.observer.validate();
      const isMultiselectValid = this.validateMultiselects();
      if (isFormValid && isMultiselectValid) {
        this.$store.commit('OPEN_LOADING_MODAL', { title: 'Enviando...' });
        const about = {
          about: {
            description: this.description,
            goals: this.goals,
            methodology: this.methodology,
          },
        };
          this.subjectService.updateSubject(this.$route.params.id, subject).then(async () => {
            this.isLoading = false;
            await this.$router.push({ name: 'Disciplinas' });
            this.makeToast('Sobre atualizado', `O Sobre a PUMA foi atualizada com sucesso`, 'success');
            this.$store.commit('CLOSE_LOADING_MODAL');
          }).catch(() => {
            this.isLoading = false;
            this.makeToast('Falha ao atualizar', `Infelizmente houve um erro ao atualizar o Sobre a PUMA", confira sua conexão com servidor e tente novamente`, 'danger');
            this.$store.commit('CLOSE_LOADING_MODAL');
          });
      }
    } catch (error) {
      this.$store.commit('CLOSE_LOADING_MODAL');
    }

  },
};