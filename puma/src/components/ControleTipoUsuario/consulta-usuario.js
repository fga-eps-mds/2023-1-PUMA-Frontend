/* eslint-disable*/
import Vue from 'vue';
import UserService from '../../services/UserService';

export default {
  name: 'ConsultaProjetos',

  data() {
    return {
      users: [],
      userTypes: [],
      userService: new UserService(),
      usersAcessibleById: [],
      userTypesSelected: [],
    };
  },
  
  beforeMount() {
    this.loadUsers();
  },

  methods: {
    loadUsers() {
      this.$store.commit('OPEN_LOADING_MODAL', { title: 'Carregando...' });
      this.userService.getAllUsers().then((response) => {
        var tempUsers = JSON.parse(JSON.stringify(response.data));

        this.userService.getUserType().then((response) => {
          this.userTypes = response.data;

          for(let i = 0;i < tempUsers.length;i++) {
            tempUsers[i].userTypeName = this.userTypes.filter(userType => userType.userTypeId === tempUsers[i].userTypeId)[0].typeName;
            this.userTypesSelected[tempUsers[i].userId] = tempUsers[i].userTypeId;
            this.usersAcessibleById[tempUsers[i].userId] = tempUsers[i];
          }
          this.users = tempUsers;
          this.sortUserNames();
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

    handleSelectChange(highlightedUser) {
      this.usersAcessibleById[highlightedUser.userId].userTypeId = this.userTypesSelected[highlightedUser.userId];
    },

    revokeUserPermissions(userId) {
      this.userService.revokeUserPermissions(userId).then((response) => {
        this.makeToastWithAutoHide('Sucesso', 'Permissões revogadas com sucesso', 'success', true);

        this.loadUsers();
      }).catch((error) => {
        this.makeToast('Erro de atualização', 'Infelizmente houve um erro ao revogar as permissões do usuário, confira sua conexão com servidor e tente novamente', 'danger');
      });
    },

    changeUserTypes() {
      this.userService.changeUserTypes(this.usersAcessibleById).then((response) => {
        this.makeToastWithAutoHide('Sucesso', 'Permissões de usuários alteradas com sucesso', 'success', true);

        this.loadUsers();
      }).catch((error) => {
        this.makeToast('Erro de atualização', 'Infelizmente houve um erro ao atualizar as permissões dos usuários, confira sua conexão com servidor e tente novamente', 'danger');
      });
    },

    cancelChanges() {
      this.loadUsers();
    },

    sortUserNames() {
      this.users.sort((a, b) => a.fullName.localeCompare(b.fullName));
    },

    makeToast: function (title, message, variant) {
      this.$bvToast.toast(message, { title: title, variant: variant, solid: true, noAutoHide: true, appendToast: true });
    },

    makeToastWithAutoHide: function (title, message, variant) {
      this.$bvToast.toast(message, { title: title, variant: variant, solid: true, appendToast: true, autoHideDelay: 500 });
    },
  },
};