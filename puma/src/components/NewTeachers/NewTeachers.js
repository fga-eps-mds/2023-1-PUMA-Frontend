import TeacherCard from './TeacherCard/TeacherCard.vue';

export default {
  name: 'NewTeachers',

  components: {
    TeacherCard,
  },

  data() {
    return {
      teste: 'teste',
      teachers: [
        {
          name: 'rafael',
        },
        {
          name: 'arthur',
        },
        {
          name: 'caio',
        },
      ],
    };
  },
};
