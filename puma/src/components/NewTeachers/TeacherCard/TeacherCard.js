import UserService from '../../../services/UserService';

export default {
  name: 'TeacherCard',

  props: {
    userId: Number,
    name: String,
    matricula: Number,
    university: String,
    departament: String,
    course: String,
    email: String,
    telefone: String,
  },

  data() {
    return {
      userService: new UserService(),
    };
  },

  computed: {
    formattedPhoneNumber() {
      if (!this.telefone) return '';
      const phoneNumber = this.telefone.replace(/\D/g, '');
      if (phoneNumber.length === 11) {
        return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7)}`;
      }
      if (phoneNumber.length === 10) {
        return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 6)}-${phoneNumber.slice(6)}`;
      }
      return this.telefone;
    },
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
