/* eslint-disable */
/* eslint-disable prefer-destructuring */
import SubjectService from '../../../services/SubjectService';
import ReturnButton from '../../shared/ReturnButton/ReturnButton.vue';

export default {
  name: 'CadastroUsuario',
  components: {
    ReturnButton,
  },
  data() {
    return {
      name: '',
      courseSyllabus: '',
      isLoading: false,
      operacao: this.$route.path.split('/', 3)[2],
      subject: '',
    };
  },
  async mounted() {
    try {
      this.$store.commit('OPEN_LOADING_MODAL', { title: 'Carregando...' });
      if (this.operacao !== 'cadastrar') {
        if (this.operacao === 'visualizar') {
          this.disableForm();
        }
      }
      this.$store.commit('CLOSE_LOADING_MODAL');
    } catch (error) {
      this.$store.commit('CLOSE_LOADING_MODAL');
    }
  },
  methods: {
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
            },
          };
          if (this.operacao === 'cadastrar') {
            this.subjectService.addSubject(subject).then(async () => {
              this.isLoading = false;
              await this.$router.push({ name: 'Usuários' });
              this.makeToast('SUCESSO', 'Usuário cadastrado com sucesso', 'success');
              this.$store.commit('CLOSE_LOADING_MODAL');
            }).catch((error) => {
              this.isLoading = false;
              this.makeToast('ERRO', 'Infelizmente houve um erro ao cadastrar o usuário', 'danger');
              this.$store.commit('CLOSE_LOADING_MODAL');
            });
          } else if (this.operacao === 'editar') {
            subject.subject.subjectid = parseInt(this.$route.params.id, 10);
            subject.subject.coursesyllabus = this.courseSyllabus;
            this.subjectService.updateSubject(this.$route.params.id, subject).then(async () => {
              this.isLoading = false;
              await this.$router.push({ name: 'Usuários' });
              this.makeToast('SUCESSO', 'Usuário atualizado com sucesso', 'success');
              this.$store.commit('CLOSE_LOADING_MODAL');
            }).catch((error) => {
              this.isLoading = false;
              this.makeToast('ERRO', 'Infelizmente houve um erro ao atualizar os dados do usuário', 'danger');
              this.$store.commit('CLOSE_LOADING_MODAL');
            });
          }
        }
      } catch (error) {
        this.$store.commit('CLOSE_LOADING_MODAL');
      }
    },
    makeToast: function (title, message, variant) {
      this.$bvToast.toast(message, { title: title, variant: variant, solid: true, autoHideDelay: 4000 });
    },

    disableForm() {
      const inputs = document.getElementsByTagName('input');
      const textareas = document.getElementsByTagName('textarea');
      for (let i = 0; i < inputs.length; i += 1) { inputs[i].disabled = true; }
      for (let i = 0; i < textareas.length; i += 1) { textareas[i].disabled = true; }
    },

    getSubject(subjectid) {
      return new Promise((resolve, reject) => {
        this.subjectService.getSubjectById(subjectid).then((response) => {
          const subject = response.data;
          this.name = subject.subject.name;
          this.courseSyllabus = subject.subject.coursesyllabus;
          resolve();
        }).catch((error) => {
          this.makeToast('ERRO', 'Infelizmente houve um erro ao recuperar os dados do usuário', 'danger');
          reject();
        });
      });
    },
  },
};
