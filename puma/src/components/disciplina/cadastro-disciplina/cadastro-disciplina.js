/* eslint-disable prefer-destructuring */
import SubjectService from '../../../services/SubjectService';
import ReturnButton from '../../shared/ReturnButton/ReturnButton.vue';

export default {
  name: 'CadastroDisciplina',
  components: {
    ReturnButton,
  },
  data() {
    return {
      name: '',
      courseSyllabus: '',
      keywords: [],
      subareas: [],
      professors: [],
      professorAlertShow: false,
      subjectService: new SubjectService(),
      multiSelectPlaceholderKeyword: 'Carregando opções...',
      multiSelectPlaceholderSubarea: 'Carregando opções...',
      multiSelectPlaceholderProfessor: 'Carregando opções...',
      isLoading: false,
      isLoadingKeywords: false,
      isLoadingSubareas: false,
      isLoadingProfessors: false,
      isTouchedImage: false,
      isTouchedKeywords: false,
      isTouchedProfessors: false,
      isTouchedSubareas: false,
      keywordAlertShow: false,
      operacao: this.$route.path.split('/', 3)[2],
      imageSelected: '',
      keywordsSelected: [],
      subareasSelected: [],
      professorsSelected: [],
      subject: '',
      imageError: false,
    };
  },
  async mounted() {
    try {
      this.$store.commit('OPEN_LOADING_MODAL', { title: 'Carregando...' });
      await this.getKeywords();
      await this.getSubareas();
      await this.getProfessors();
      if (this.operacao !== 'cadastrar') {
        if (this.operacao === 'visualizar') {
          this.disableForm();
          this.removeDropdownIcons();
        }
        await this.getSubject(this.$route.params.id);
        this.keywords = [...this.keywordsSelected, ...this.keywords];
      }
      this.$store.commit('CLOSE_LOADING_MODAL');
    } catch (error) {
      this.$store.commit('CLOSE_LOADING_MODAL');
    }
  },
  methods: {
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
    async onSubmit() {
      try {
        const isFormValid = await this.$refs.observer.validate();
        const isMultiselectValid = this.validateMultiselects();
        if (isFormValid && isMultiselectValid) {
          this.$store.commit('OPEN_LOADING_MODAL', { title: 'Enviando...' });
          const subject = {
            subject: {
              name: this.name,
              courseSyllabus: this.courseSyllabus,
              image: this.imageSelected,
            },
            keywords: this.keywordsSelected[0],
            subareas: this.subareasSelected[0],
            professors: this.professorsSelected[0],
          };
          if (this.operacao === 'cadastrar') {
            this.subjectService.addSubject(subject).then(async () => {
              this.isLoading = false;
              await this.$router.push({ name: 'Disciplinas' });
              this.makeToast('Disciplina cadastrada', `A disciplina "${this.name}" foi cadastrada com sucesso`, 'success');
              this.$store.commit('CLOSE_LOADING_MODAL');
            }).catch(() => {
              this.isLoading = false;
              this.makeToast('Falha ao cadastrar', `Infelizmente houve um erro ao cadastrar a disciplina "${this.name}", confira sua conexão com servidor e tente novamente`, 'danger');
              this.$store.commit('CLOSE_LOADING_MODAL');
            });
          } else if (this.operacao === 'editar') {
            subject.subject.subjectId = parseInt(this.$route.params.id, 10);
            subject.subject.courseSyllabus = this.courseSyllabus;
            this.subjectService.updateSubject(this.$route.params.id, subject).then(async () => {
              this.isLoading = false;
              await this.$router.push({ name: 'Disciplinas' });
              this.makeToast('Disciplina atualizada', `A disciplina "${this.name}" foi atualizada com sucesso`, 'success');
              this.$store.commit('CLOSE_LOADING_MODAL');
            }).catch(() => {
              this.isLoading = false;
              this.makeToast('Falha ao atualizar', `Infelizmente houve um erro ao atualizar a disciplina "${this.name}", confira sua conexão com servidor e tente novamente`, 'danger');
              this.$store.commit('CLOSE_LOADING_MODAL');
            });
          }
        }
      } catch (error) {
        this.$store.commit('CLOSE_LOADING_MODAL');
      }
    },
    async deleteSubject() {
      const subjectId = parseInt(this.$route.params.id, 10);
      this.subjectService.deleteSubject(subjectId).then(async () => {
        this.isLoading = false;
        await this.$router.push({ name: 'Disciplinas' });
        this.makeToast('Disciplina deletada', `A disciplina "${this.name}" foi deletada com sucesso`, 'success');
        this.$store.commit('CLOSE_LOADING_MODAL');
      }).catch(() => {
        this.isLoading = false;
        this.makeToast('Falha ao deletar', `Infelizmente houve um erro ao deletar a disciplina "${this.name}", confira sua conexão com servidor e tente novamente`, 'danger');
        this.$store.commit('CLOSE_LOADING_MODAL');
      });
    },
    makeToast(title, message, variant) {
      this.$bvToast.toast(message, {
        title, variant, solid: true, noAutoHide: true, appendToast: true,
      });
    },
    sortKeywordMultiselectLabels() {
      this.keywordsSelected.sort((a, b) => b.keyword.length - a.keyword.length);
    },
    sortSubareaMultiselectLabels() {
      this.subareasSelected.sort((a, b) => b.description.length - a.description.length);
    },
    sortProfessorMultiselectLabels(value) {
      // eslint-disable-next-line
      if (value.filter((professor) => professor.userId === this.$store.getters.user.userId).length === 0) {
        // eslint-disable-next-line
        value.push(this.professors.filter((professor) => professor.userId === this.$store.getters.user.userId)[0]);
      }
      this.professorsSelected.sort((a, b) => b.fullName.length - a.fullName.length);
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
    disableForm() {
      const inputs = document.getElementsByTagName('input');
      const textareas = document.getElementsByTagName('textarea');
      for (let i = 0; i < inputs.length; i += 1) { inputs[i].disabled = true; }
      for (let i = 0; i < textareas.length; i += 1) { textareas[i].disabled = true; }
    },
    removeDropdownIcons() {
      const multiselecctsIcon = document.getElementsByClassName('multiselect__select');
      while (multiselecctsIcon.length > 0) {
        multiselecctsIcon[0].remove();
      }
    },
    addKeyword(keyword) {
      this.keywords.push({ keyword });
      this.keywordsSelected.push({ keyword });
    },
    getKeywords() {
      this.isLoadingKeywords = true;
      return new Promise((resolve, reject) => {
        this.subjectService.getAvailableKeywordsToSubject().then((response) => {
          this.keywords = response.data;
          this.isLoadingKeywords = false;
          this.multiSelectPlaceholderKeyword = 'Crie ou selecione palavras chave para disciplina';
          resolve();
        }).catch(() => {
          this.isLoadingKeywords = false;
          this.multiSelectPlaceholderKeyword = 'Crie ou selecione palavras chave para a disciplina';
          this.makeToast('Erro de busca', 'Infelizmente houve um erro ao recuperar a lista de palavras disponíveis, confira sua conexão com servidor e tente novamente', 'danger');
          reject();
        });
      });
    },
    getSubareas() {
      this.isLoadingSubareas = true;
      return new Promise((resolve, reject) => {
        this.subjectService.getKnowledgeAreas().then((response) => {
          this.subareas = response.data;
          this.isLoadingSubareas = false;
          this.multiSelectPlaceholderSubarea = this.subareas.length ? 'Selecione as subáreas do conhecimento que correspondam a disciplina' : 'Sem subáreas disponíveis';
          resolve();
        }).catch(() => {
          this.isLoadingSubareas = false;
          this.multiSelectPlaceholderSubarea = 'Sem subáreas disponíveis';
          this.makeToast('Erro de busca', 'Infelizmente houve um erro ao recuperar a lista de subáreas, confira sua conexão com servidor e tente novamente', 'danger');
          reject();
        });
      });
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
    getSubject(subjectid) {
      return new Promise((resolve, reject) => {
        this.subjectService.getSubjectById(subjectid).then((response) => {
          const subject = response.data;
          this.keywordsSelected = subject.keywords;
          this.subareasSelected = subject.subareas;
          this.professorsSelected = subject.professors;
          this.subject = subject.subject;
          this.name = subject.subject.name;
          this.courseSyllabus = subject.subject.courseSyllabus;
          this.imageSelected = subject.subject.image;
          resolve();
        }).catch(() => {
          this.makeToast('Erro de busca', 'Infelizmente houve um erro ao recuperar a lista de disciplinas disponíveis, confira sua conexão com servidor e tente novamente', 'danger');
          reject();
        });
      });
    },
  },
};
