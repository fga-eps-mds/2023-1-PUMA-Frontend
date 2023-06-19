export default {
  name: 'ListaParceiros',

  props: {
    name: 'a',
  },

  data: () => ({
    return: {
      listPartners: [
        {
          id: 1, image: '../../../../assets/imagemTemporaria.png', name: 'Parceiro 1',
        },
        {
          id: 2, image: '../../../../assets/imagemTemporaria.png', name: 'Parceiro 2',
        },
        {
          id: 3, image: '../../../../assets/imagemTemporaria.png', name: 'Parceiro 3',
        },
        {
          id: 4, image: '../../../../assets/imagemTemporaria.png', name: 'Parceiro 4',
        },
      ],
      parceiros: ['a', 'b', 'c', 'd'],
    },
  }),

  watch: {
    dataSubjects() {
      this.listSubjects = this.dataSubjects;
    },

    subjectSearch() {
      if (this.subjectSearch) {
        this.listSubjects = this.dataSubjects.filter((item) => (
          item.name.toLowerCase().includes(this.subjectSearch.toLowerCase())));
      } else {
        this.listSubjects = this.dataSubjects;
      }
    },
  },

  methods: {
    goToSubject(id) {
      this.$router.push({ path: `/parceiros/cadastrar/${id}` });
    },
    goToSubjectEdition(id) {
      this.$router.push({ path: `/parceiros/editar/${id}` });
    },
  },
};
