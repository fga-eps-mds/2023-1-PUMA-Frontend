import ProjectService from '../../../services/ProjectService';
import ReturnButton from '../../shared/ReturnButton/ReturnButton.vue';

export default {
  name: 'CadastroProjeto',
  components: {
    ReturnButton,
  },
  data() {
    return {
      titulo: '',
      descricao: '',
      resultadoEsperado: '',
      formIsValid: '',
      keywords: [],
      mainKeyword: null,
      selectedKeywords: [],
      projectService: new ProjectService(),
      multiSelectPlaceholder: 'Carregando opções...',
    };
  },
  beforeMount() {
    this.getKeywords();
  },
  methods: {
    async onSubmit() {
      try {
        const isFormValid = await this.$refs.observer.validate();
        if (!isFormValid) return;

        this.$store.commit('OPEN_LOADING_MODAL', { title: 'Cadastrando...' });

        const project = {
          name: this.titulo,
          problem: this.descricao,
          expectedresult: this.resultadoEsperado,
          status: 'SB',
          createdat: new Date().toISOString(),
          userid: this.$store.getters.user.userId,
          // eslint-disable-next-line
          keywords: this.selectedKeywords.map((k) => ({ keywordid: k.value, main: k.value === this.mainKeyword?.value })),
        };

        await this.projectService.addProject(project);

        this.$store.commit('CLOSE_LOADING_MODAL');
        await this.$router.push({ path: '/meus-projetos' });
        this.makeToast('Projeto cadastrado', `O projeto "${project.name}" foi cadastrado com sucesso`, 'success');
      } catch (error) {
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('Falha ao cadastrar projeto', 'Infelizmente houve um erro ao realizar cadastro, confira os dados inseridos e sua conexão com servidor e tente novamente', 'danger');
      }
    },
    handleChangeKeywords(value) {
      if (!value.find((k) => k.value === this.mainKeyword?.value)) {
        this.mainKeyword = null;
      }
    },
    makeToast(title, message, variant) {
      this.$bvToast.toast(message, {
        title, variant, solid: true, noAutoHide: true, appendToast: true,
      });
    },
    isChecked(option) {
      return this.selectedKeywords.some((op) => op.value === option.value);
    },
    disableForm() {
      const inputs = document.getElementsByTagName('input');
      const textareas = document.getElementsByTagName('textarea');
      for (let i = 0; i < inputs.length; i += 1) { inputs[i].disabled = true; }
      for (let i = 0; i < textareas.length; i += 1) { textareas[i].disabled = true; }
    },
    removeDropdownIcons() {
      document.getElementsByClassName('multiselect__select')[0].remove();
    },
    async getKeywords() {
      try {
        this.$store.commit('OPEN_LOADING_MODAL', { title: 'Carregando...' });

        const response = await this.projectService.getAvailableKeywordsToProject();
        this.keywords = response.data.map((k) => ({ value: k.keywordid, text: k.keyword }))
          .sort((a, b) => a.text.localeCompare(b.text));
        this.multiSelectPlaceholder = this.keywords.length ? 'Selecione' : 'Sem palavras disponíveis';

        this.$store.commit('CLOSE_LOADING_MODAL');
      } catch (error) {
        this.multiSelectPlaceholder = 'Sem palavras disponíveis';
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('Erro de busca', 'Infelizmente houve um erro ao recuperar lista de palavras-chave, confira sua conexão com servidor e tente novamente', 'danger');
      }
    },
    getProject(projectId) {
      this.projectService.getProject(projectId).then((response) => {
        const project = response.data;
        this.selectedKeywords = project.keywords;
        this.titulo = project.name;
        this.descricao = project.problem;
        this.resultadoEsperado = project.expectedresult;
      }).catch(() => {
        this.makeToast('Erro de busca', 'Infelizmente houve um erro ao recuperar projeto, confira sua conexão com servidor e tente novamente', 'danger');
      });
    },
  },
};
