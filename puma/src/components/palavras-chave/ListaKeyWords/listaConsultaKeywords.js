import KeywordService from '../../../services/KeywordService';

export default {
  props: {
    tableKeywordSubject: Array,
    keywordsInfo: {},
    subjectsForm: [],
    subjects: [],
    form_prop: { },
  },

  data: () => ({
    listKeyWords: [],
    openModalEdit: false,
    keywordService: new KeywordService(),
    kwNameAlreadyExist: false,
    newKeyWords: [],
    idKeywordEdit: '',
    keywordDelete: null,
  }),

  watch: {
    tableKeywordSubject() {
      this.listKeyWords = this.tableKeywordSubject;
    },
  },

  methods: {
    goToSubject(id) {
      this.$router.push({ path: `/disciplinas/visualizar/${id}` });
    },

    subjectSearch() {
      this.listKeyWords = this.tableKeywordSubject;
    },

    keywordNameAlreadyExist() {
      this.kwNameAlreadyExist = this.tableKeywordSubject.some(
        (k) => this.treatKeyword(k.keyword) === this.treatKeyword(this.form.keywordName),
      );
    },

    allowEdit(keywordId) {
      const { isAdmin, userId } = this.$store.getters.user;
      if (isAdmin) return true;

      let flag = false;

      Object.values(this.keywordsInfo[keywordId]).forEach((profId) => {
        if (userId === profId) {
          flag = true;
        }
      });

      if (flag) {
        return true;
      }
      return false;
    },

    editKeyword(keyword) {
      this.openModalEdit = true;
      this.idKeywordEdit = keyword.keywordid;
      this.form = { keywordName: keyword.keyword, selectedSubject: keyword.subjectid };
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

    async handleEdit() {
      try {
        const isFormValid = await this.$refs.observer.validate();
        if (isFormValid && this.kwNameAlreadyExist === false) {
          this.$store.commit('OPEN_LOADING_MODAL', { title: 'Enviando...' });
          const response = await this.keywordService.updateKeyword(
            this.idKeywordEdit,
            this.form.keywordName,
          );
          const idKeywordUpdated = response.data.keywordid;
          await this.keywordService.updateSubjectKeyword(
            idKeywordUpdated,
            this.form.selectedSubject,
          );
          this.openModalEdit = false;
          this.$store.commit('CLOSE_LOADING_MODAL');
          const subjectName = this.subjectsForm.find(
            (s) => s.value === this.form.selectedSubject,
          ).text;
          this.makeToast('SUCESSO', 'Palavra-Chave editada com sucesso!', 'success');
          this.listKeyWords = this.listKeyWords.map((kw) => {
            if (kw.keywordid === this.idKeywordEdit) {
              return {
                ...kw,
                keyword: this.form.keywordName,
                subjectname: subjectName,
              };
            }
            return kw;
          });
        }
      } catch (error) {
        this.openModalEdit = false;
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('ERRO', 'Infelizmente houve um erro ao tentar editar a palavra-chave', 'danger');
      }
    },

    deleteKeyword(keyWord) {
      this.$store.commit('OPEN_CONFIRM_MODAL', {
        title: 'Excluir Palavra-Chave',
        content: 'Confirmar exclusão da palavra-chave ?',
        cancelButton: {
          text: 'Cancelar',
          variant: 'outline-danger',
          onClick: () => this.$store.commit('CLOSE_CONFIRM_MODAL'),
        },
        okButton: {
          text: 'Confirmar',
          variant: 'danger',
          onClick: () => { this.handleDelete(); this.$store.commit('CLOSE_CONFIRM_MODAL'); },
        },
      });
      this.keywordDelete = keyWord.keywordid;
    },

    async handleDelete() {
      try {
        this.$store.commit('OPEN_LOADING_MODAL', { title: 'Enviando...' });
        await this.keywordService.deleteKeyword(this.keywordDelete);
        this.listKeyWords = this.listKeyWords.filter((kw) => kw.keywordid !== this.keywordDelete);
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('SUCESSO', 'Palavra-chave excluída com sucesso!', 'success');
      } catch (error) {
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('ERRO', 'Infelizmente houve um erro ao tentar excluir a palavra-chave', 'danger');
      }
    },

    fecharModal() {
      this.openModalEdit = false;
    },
  },
};
