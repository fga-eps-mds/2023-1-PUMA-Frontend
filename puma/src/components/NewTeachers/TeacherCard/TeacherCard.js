import UserService from '../../../services/UserService';

export default {
  name: 'TeacherCard',

  props: {
    userId: Number,
    name: String,
  },

  data() {
    return {
      userService: new UserService(),
    };
  },

  methods: {
    acceptOrDeny(userId, accept) {
      return new Promise((resolve, reject) => {
        this.userService.updateStatusTeacher(userId, accept).then((response) => {
          window.location.reload();
          resolve();
        }).catch(() => {
          reject();
        });
      });
    },
  },
};
