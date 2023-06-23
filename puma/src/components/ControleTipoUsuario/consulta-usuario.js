/* eslint-disable*/
import UserService from '../../services/UserService';

export default {
  name: 'ConsultaProjetos',

  data() {
    return {
      users: [],
      userTypes: [],
      userService: new UserService(),
    };
  },
  
  beforeMount() {
    this.loadUsers();
  },

  methods: {
    loadUsers() {
      this.$store.commit('OPEN_LOADING_MODAL', { title: 'Carregando...' });
      this.userService.getAllUsers().then((response) => {
        var tempUsers = response.data;

        this.userService.getUserType().then((response) => {
          this.userTypes = response.data;

          for(let i = 0;i < tempUsers.length;i++) {
            tempUsers[i].userTypeName = this.userTypes.filter(userType => userType.userTypeId === tempUsers[i].userTypeId)[0].typeName;
          }
          this.users = tempUsers;
  
        }).catch(() => {
          this.$store.commit('CLOSE_LOADING_MODAL');
          this.makeToast('Erro de busca', 'Infelizmente houve um erro ao recuperar lista de tipos de usuário, confira sua conexão com servidor e tente novamente', 'danger');
        });

        this.$store.commit('CLOSE_LOADING_MODAL');
      }).catch(() => {
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('Erro de busca', 'Infelizmente houve um erro ao recuperar lista de usuários, confira sua conexão com servidor e tente novamente', 'danger');
      });
    },

    makeToast: function (title, message, variant) {
      this.$bvToast.toast(message, { title: title, variant: variant, solid: true, noAutoHide: true, appendToast: true });
    },
  },
};