import ProjectService from '../../../services/ProjectService';
import statusProjetoEnum from '../../../utils/enums/status-projeto.enum';
import ReturnButton from '../../shared/ReturnButton/ReturnButton.vue';

export default {
  name: 'ViewMyProject',
  mixins: [statusProjetoEnum],
  props: {},
  components: {
    ReturnButton,
  },
  data() {
    return {
      disabled: true,
      editable: false,
      initialForm: {
        projectid: null,
        name: '',
        createdat: '',
        problem: '',
        expectedresult: '',
        status: '',
        statusdesc: '',
        feedback: '',
        mainKeyword: null,
        selectedKeywords: [],
        subject: {
          subjectid: null,
          name: '',
        },
        user: {
          userid: null,
          fullname: '',
          email: '',
          phonenumber: '',
        },
        semester: {
          semesterid: null,
          year: '',
          semester: '',
        },
      },
      form: {},
      keywords: [],
    };
  },
  async created() {
    this.form = JSON.parse(JSON.stringify(this.initialForm));
    await this.handleLoadData();
    this.editable = ['SB'].includes(this.form.status);
  },
  methods: {
    toggleEnableForm() {
      this.disabled = !this.disabled;
    },
    isChecked(keyword) {
      return this.form.selectedKeywords.find((k) => k.value === keyword.value);
    },
    hasFeedback() {
      return ['AC', 'RC', 'IC', 'EX', 'EC'].includes(this.form.status);
    },
    makeToast(title, message, variant) {
      this.$bvToast.toast(message, {
        title, variant, solid: true, noAutoHide: true, appendToast: true,
      });
    },
    handleChangeKeywords(value) {
      if (!value.find((k) => k.value === this.form.mainKeyword?.value)) {
        this.form.mainKeyword = null;
      }
    },
    async handleLoadData() {
      try {
        const projectId = this.$route.params.id;
        const projectService = new ProjectService();

        this.$store.commit('OPEN_LOADING_MODAL', { title: 'Carregando...' });

        const project = (await projectService.getProject(projectId)).data;

        const allKeywords = (await projectService.getAvailableKeywordsToProject()).data;

        const {
          Keywords, User, Subject, Semester, ...rest
        } = project;
        const mainKeyword = Keywords.filter((k) => k.main)[0];
        const createdat = (new Date(project.createdat)).toLocaleString();
        const formData = {
          ...rest,
          createdat,
          statusdesc: this.getDescricao(project.status),
          user: User,
          subject: Subject,
          semester: Semester,
          mainKeyword: mainKeyword && { value: mainKeyword.keywordid, text: mainKeyword.keyword },
          selectedKeywords: Keywords.map((k) => ({ value: k.keywordid, text: k.keyword }))
            .sort((a, b) => a.text.localeCompare(b.text)),
        };

        this.keywords = allKeywords.map((k) => ({ value: k.keywordid, text: k.keyword }))
          .sort((a, b) => a.text.localeCompare(b.text));

        this.initialForm = JSON.parse(JSON.stringify(formData));
        this.form = JSON.parse(JSON.stringify(formData));

        this.$store.commit('CLOSE_LOADING_MODAL');
      } catch (error) {
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('Erro de busca', 'Infelizmente houve um erro ao carregar os dados desse projeto, confira sua conexão com servidor e tente novamente mais tarde', 'danger');
      }
    },
    async handleSubmit() {
      try {
        const isFormValid = await this.$refs.observer.validate();
        if (!isFormValid) return;

        const projectService = new ProjectService();
        this.$store.commit('OPEN_LOADING_MODAL', { title: 'Salvando...' });

        const payload = {
          projectid: this.form.projectid,
          name: this.form.name,
          problem: this.form.problem,
          expectedresult: this.form.expectedresult,
          keywords: this.form.selectedKeywords.map((k) => ({
            keywordid: k.value, main: k.value === this.form.mainKeyword.value,
          })),
        };

        await projectService.updateProject(payload);
        this.$store.commit('CLOSE_LOADING_MODAL');
        await this.$router.push({ path: '/meus-projetos' });
        this.makeToast('Projeto editado com sucesso', `Edição no projeto "${this.form.name}" foi realizada com sucesso`, 'success');
      } catch (error) {
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('Erro na edição', 'Infelizmente houve um erro ao realizar edição, confira sua conexão com servidor e os dados inseridos e tente novamente mais tarde', 'danger');
      }
    },
    handleCancelEdit() {
      this.form = JSON.parse(JSON.stringify(this.initialForm));
      this.toggleEnableForm();
    },
    async handleDelete() {
      try {
        const projectService = new ProjectService();
        this.$store.commit('CLOSE_CONFIRM_MODAL');
        this.$store.commit('OPEN_LOADING_MODAL', { title: 'Excluindo...' });
        await projectService.deleteProject(this.form.projectid);
        this.$store.commit('CLOSE_LOADING_MODAL');
        await this.$router.push({ path: '/meus-projetos' });
        this.makeToast('Projeto excluido com sucesso', `Projeto "${this.form.name}" foi excluido com sucesso`, 'success');
      } catch (error) {
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('Erro ao excluir', 'Infelizmente houve um erro ao excluir projeto, confira sua conexão com servidor e tente novamente', 'danger');
      }
    },
    handleDeleteProject() {
      this.$store.commit('OPEN_CONFIRM_MODAL', {
        title: 'Excluir Projeto',
        content: 'Confirmar exclusão do projeto?',
        okButton: {
          text: 'Confirmar',
          variant: 'danger',
          onClick: () => this.handleDelete(),
        },
        cancelButton: {
          text: 'Cancelar',
          variant: 'outline-danger',
          onClick: () => this.$store.commit('CLOSE_CONFIRM_MODAL'),
        },
      });
    },
  },
};
