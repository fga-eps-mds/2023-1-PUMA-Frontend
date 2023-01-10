import ListaConsultaTurma from './ListaConsultaTurma/ListaConsultaTurma.vue';

export default {
  components: {
    ListaConsultaTurma,
  },

  data: () => ({
    subjectSearch: null,
    dispMySubjects: false,
    dispTimeFIlter: false,
    listYears: [
      { date: 2023, selected: false },
      { date: 2022, selected: false },
      { date: 2021, selected: false },
      { date: 2020, selected: false },
    ],
    listSemesters: [
      { name: '1°', selected: false, value: '1' },
      { name: '2°', selected: false, value: '2' },
      { name: 'Verão', selected: false, value: 'VERAO' },
    ],
  }),
};
