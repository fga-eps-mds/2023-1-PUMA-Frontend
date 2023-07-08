/* eslint-disable */
import ReturnButton from '../../shared/ReturnButton/ReturnButton.vue';
import PumaInfoService from '../../../services/PumaInfoService';
import UserService from '../../../services/UserService';

export default {
  beforeMount() {
    this.getPuma_Infos();
  },
  name: 'CadastroSobre',
  components: {
    ReturnButton,
  },
  data() {
    return {
      description: '',
      methodology: '',
      goals: '',
      professors: [],
      professorAlertShow: false,
      pumaInfo: [],
      pumaInfoService: new PumaInfoService(),
      userService: new UserService(),
      multiSelectPlaceholderProfessor: 'Carregando opções...',
      isLoading: false,
      isLoadingProfessors: false,
      isTouchedImage: false,
      isTouchedKeywords: false,
      isTouchedProfessors: false,
      operacao: this.$route.path.split('/', 3)[2],
      imageSelected: '',
      imageSelected2: '',
      imageSelected3: '',
      professorsSelected: [],
      subject: '',
      imageError: false,
      titleDescription: '',
      titleMethodology: '',
      titleGoal: '',
      titleTeachers: ''
    };
  },
  async mounted() {
    try {
      await this.getProfessors();
      // console.log(this.professors);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async getPuma_Infos(){
      this.id = this.$route.params.id;
      await this.pumaInfoService.getPuma_Infos(this.id).then((response) => {
        this.pumaItem = response.data['0']
        this.infoId = this.pumaItem.infoId
        this.titleDescription = this.pumaItem.titleDescription
        this.description = this.pumaItem.description
        this.imageSelected3 = this.pumaItem.descriptionImage
        this.goals = this.pumaItem.goal
        this.titleGoal = this.pumaItem.titleGoal
        this.goalImage = this.pumaItem.goalImage
        this.imageSelected2 = this.pumaItem.goalImage
        this.methodology = this.pumaItem.methodology
        this.imageSelected = this.pumaItem.methodologyImage
        this.titleTeachers = this.pumaItem.titleTeachers
      }).catch((e) => {
        console.log(e);
      });
    },
    handleMetImage(input) {
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
    handleObjImage(input) {
      if (input.files && input.files[0]) {
        if (input.files[0].size > 2000000) {
          this.imageError = true;
          return;
        }
        this.imageError = false;
        const reader = new FileReader();

        reader.onload = (e) => {
          this.imageSelected2 = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
      }
    },
    handleDesImage(input) {
      if (input.files && input.files[0]) {
        if (input.files[0].size > 2000000) {
          this.imageError = true;
          return;
        }
        this.imageError = false;
        const reader = new FileReader();

        reader.onload = (e) => {
          this.imageSelected3 = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
      }
    },
    async onSubmit() {
      try {
        const moreInfos = this.pumaInfo.moreInfos;
        const teachers = this.pumaInfo.teachers;
        teachers.forEach(teacher => {
          if (this.professorsSelected[0].includes(teacher)) {
            teacher.isIdealizer = true;
          } else {
            teacher.isIdealizer = false;
          }
        });
        const topics = this.pumaInfo.topics;
        const pumaItem = this.pumaInfo['0'];
        const newPumaItem = {
          infoId: pumaItem.infoId,
          titleDescription: this.titleDescription,
          description: this.description,
          descriptionImage: this.imageSelected3,
          goal: this.goals,
          titleGoal: this.titleGoal,
          goalImage: this.imageSelected2,
          titleMethodology: this.titleMethodology,
          methodology: this.methodology,
          methodologyImage: this.imageSelected,
        };
        const newObj = {
          pumaItem: newPumaItem,
          topics: topics,
          moreInfos: moreInfos,
          teachers: teachers,
        };
        this.pumaInfoService.updatePuma_Info(newObj).then(async () => {
          this.isLoading = false;
          await this.$router.push({ name: 'Sobre' });
          this.makeToast('Objetivos da Puma', 'Atualização realizada com sucesso', 'success');
          this.$store.commit('CLOSE_LOADING_MODAL');
        }).catch(() => {
          this.isLoading = false;
          this.makeToast('Falha ao atualizar', 'Atualização falhou!', 'danger');
          this.$store.commit('CLOSE_LOADING_MODAL');
        });
      } catch (error) {
        this.$store.commit('CLOSE_LOADING_MODAL');
      }
    },
    makeToast(title, message, variant) {
      this.$bvToast.toast(message, {
        title, variant, solid: true, noAutoHide: true, appendToast: true,
      });
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
      this.isTouchedSubareas = true;
      return (
        !!this.professorsSelected.length
      );
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
    getProfessors() {
      this.isLoadingProfessors = true;
      return new Promise((resolve, reject) => {
        this.pumaInfoService.getPuma_Infos().then((response) => {
          this.pumaInfo = response.data;
          this.professors = this.pumaInfo.teachers;
          // eslint-disable-next-line
          this.professorsSelected.push(response.data.teachers.filter((professor) => professor.userId === this.$store.getters.user.userId));
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
    separateSubjects() {
      this.subjects.map((sub) => {
        sub.professors.map((prof) => {
          if (prof.userId === this.$store.getters.user.userId) {
            this.mySubjects.push(sub);
            this.subjects = this.subjects.filter((item) => (
              item.subjectId !== sub.subjectId));
          }
          return prof;
        });
        return null;
      });
    },
  },
};
    