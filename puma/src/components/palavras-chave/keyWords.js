import KeywordService from '../../services/KeywordService';
import SubjectService from '../../services/SubjectService';
import ListaConsultaKeyWords from './ListaKeyWords/ListaConsultaKeywords.vue';

export default {
  components: {
    ListaConsultaKeyWords,
  },

  data() {
    return {
      kwNameAlreadyExist: false,
      multiSelectPlaceholder: 'Carregando opções...',
      keywordService: new KeywordService(),
      subjectService: new SubjectService(),
      openModalRegister: false,
      openModalEdit: false,
      currentKeyWord: {},
      selected: null,
      form: { keywordName: '', selectedSubject: null },
      idKeywordEdit: '',
      idSubjectEdit: '',
      flag: false,
      subjects: [],
      subjectsForm: [],
      subjectsList: [],
      isLoadingKeywords: false,
      optionsSelected: [],
      keyWords: [],
      keywordsInfo: {},
      tableKeywordSubject: [],
    };
  },
  created() {
    this.handleLoadData();
  },
  methods: {
    async handleLoadData() {
      try {
        this.$store.commit('OPEN_LOADING_MODAL', { title: 'Carregando...' });
        const { isAdmin } = this.$store.getters.user;
        await this.getKeywords();
        if (isAdmin) {
          await this.getSubjects();
        } else {
          await this.getSubjectsProfessor();
          await this.getFilterProfessor();
        }
        this.$store.commit('CLOSE_LOADING_MODAL');
      } catch (error) {
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('ERRO', 'Falha ao carregar os dados', 'danger');
      }
    },

    async getKeywords() {
      try {
        const { data } = await this.keywordService.getKeywords();
        this.tableKeywordSubject = JSON.parse(JSON.stringify(data.reverse()));
        this.keyWords = data;
        Object.keys(data).forEach((key) => {
          this.keywordsInfo[data[key].keywordid] = data[key].array_agg;
        });
      } catch (error) {
        this.makeToast('ERRO', 'Falha ao carregar as palavras-chave', 'danger');
      }
    },

    async getSubjects() {
      try {
        const allSubjects = (await this.subjectService.getSubjects()).data.map(
          (s) => ({ value: s.subjectid, text: s.name }
          ),
        );
        this.subjectsForm = JSON.parse(JSON.stringify(allSubjects));
        this.subjectsForm.unshift({ value: null, text: 'Escolha a disciplina', disabled: true });
        this.subjects = JSON.parse(JSON.stringify(allSubjects));
        this.subjects.unshift({ value: 0, text: 'Todas as Disciplinas' });
        this.subjects.unshift({ value: null, text: 'Escolha a disciplina', disabled: true });
      } catch (error) {
        this.makeToast('ERRO', 'Falha ao carregar as disciplinas', 'danger');
      }
    },

    async getSubjectsProfessor() {
      try {
        const { userId } = this.$store.getters.user;
        const subjectByKeywords = [];
        Object.keys(this.keyWords).forEach((key) => {
          Object.values(this.keyWords[key].array_agg).forEach((allowId) => {
            if (allowId === userId) {
              subjectByKeywords.push({
                value: this.keyWords[key].subjectid,
                text: this.keyWords[key].subjectname,
              });
            }
          });
        });
        this.subjectsForm = [...new Set(subjectByKeywords.map((o) => JSON.stringify(o)))].map(
          (s) => (JSON.parse(s)),
        );
        this.subjectsForm.unshift({ value: null, text: 'Escolha a disciplina', disabled: true });
      } catch (erro) {
        this.makeToast('ERRO', 'Falha ao carregar as disciplinas', 'danger');
      }
    },

    async getFilterProfessor() {
      try {
        const allSubjects = (await this.subjectService.getSubjects()).data.map(
          (s) => ({ value: s.subjectid, text: s.name }),
        );
        this.subjects = JSON.parse(JSON.stringify(allSubjects));
        this.subjects.unshift({ value: 0, text: 'Todas as Disciplinas' });
        this.subjects.unshift({ value: null, text: 'Escolha a disciplina', disabled: true });
      } catch (error) {
        this.makeToast('ERRO', 'Falha ao carregar Professor', 'danger');
      }
    },

    filter(subjectId) {
      this.tableKeywordSubject = this.keyWords;
      if (subjectId === 0) {
        this.tableKeywordSubject = this.keyWords;
      } else {
        this.tableKeywordSubject = this.tableKeywordSubject.filter(
          (d) => d.subjectid === subjectId,
        );
      }
    },

    addKeyword() {
      this.openModalRegister = true;
      this.getKeywords();
      this.form = { keywordName: '', selectedSubject: null };
    },

    keywordNameAlreadyExist() {
      this.kwNameAlreadyExist = this.tableKeywordSubject.some(
        (k) => this.treatKeyword(k.keyword) === this.treatKeyword(this.form.keywordName),
      );
    },

    treatKeyword(keyword) { return keyword.split(' ').join('').toLowerCase(); },

    async handleAdd() {
      try {
        this.keywordNameAlreadyExist();
        const isFormValid = await this.$refs.observer.validate();

        if (isFormValid && !this.kwNameAlreadyExist) {
          this.$store.commit('OPEN_LOADING_MODAL', { title: 'Enviando...' });
          const response = await this.keywordService.addKeyword(this.form.keywordName);
          const currentKeywordid = response.data.keywordid;
          const idSubject = this.form.selectedSubject;

          await this.keywordService.addKeywordToSubject(currentKeywordid, idSubject);
          await this.getKeywords();

          this.openModalRegister = false;
          this.$store.commit('CLOSE_LOADING_MODAL');
          this.makeToast('SUCESSO', 'Cadastro realizado com sucesso!', 'success');
        }
      } catch (error) {
        this.openModalRegister = false;
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('ERRO', 'Infelizmente houve um erro ao tentar cadastrar a palavra-chave', 'danger');
      }
    },

    makeToast(thisTitle, message, thisVariant) {
      this.$bvToast.toast(
        message,
        {
          title: thisTitle,
          variant: thisVariant,
          solid: true,
          autoHideDelay: 4000,
        },
      );
    },

    fecharModal() {
      this.openModalRegister = false;
    },
  },
};
