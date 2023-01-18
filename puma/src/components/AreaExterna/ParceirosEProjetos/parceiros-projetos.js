/* eslint-disable*/
import AreaExternaHeader from '../AreaExternaHeader/AreaExternaHeader.vue';
import InfoParceiro from '../InfoParceiro/InfoParceiro.vue';
export default {
  components: {
    AreaExternaHeader,
    InfoParceiro,
  },

  data() {
    return {
      infoParceiros: [
      {
        name: 'Exército Brasileiro',
        description: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores obcaecati perspiciatis ut omnis sunt vel inventore corporis! Id ad, aliquam voluptatem ipsam nobis corporis accusamus perferendis dolor magnam nihil.', 'Nobis corporis, quae totam nam pariatur eaque voluptatibus veritatis exercitationem assumenda, nesciunt illo? Magnam labore sapiente pariatur quisquam praesentium ea eveniet distinctio nihil modi. Deleniti perferendis esse voluptatem quam molestiae.'],
        website: 'https://www.google.com',
        projectScope: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores obcaecati perspiciatis ut omnis sunt vel inventore corporis! Id ad, aliquam voluptatem ipsam nobis corporis accusamus perferendis dolor magnam nihil.', 'Nobis corporis, quae totam nam pariatur eaque voluptatibus veritatis exercitationem assumenda, nesciunt illo? Magnam labore sapiente pariatur quisquam praesentium ea eveniet distinctio nihil modi. Deleniti perferendis esse voluptatem quam molestiae.'],
        projectKeyResults: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores obcaecati perspiciatis ut omnis sunt vel inventore corporis! Id ad, aliquam voluptatem ipsam nobis corporis accusamus perferendis dolor magnam nihil.', 'Nobis corporis, quae totam nam pariatur eaque voluptatibus veritatis exercitationem assumenda, nesciunt illo? Magnam labore sapiente pariatur quisquam praesentium ea eveniet distinctio nihil modi. Deleniti perferendis esse voluptatem quam molestiae.'],
        logo: 'https://blog.iprocess.com.br/wp-content/uploads/2021/11/placeholder.png'
      },
      {
        name: 'Exército Brasileiro 2',
        description: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores obcaecati perspiciatis ut omnis sunt vel inventore corporis! Id ad, aliquam voluptatem ipsam nobis corporis accusamus perferendis dolor magnam nihil.', 'Nobis corporis, quae totam nam pariatur eaque voluptatibus veritatis exercitationem assumenda, nesciunt illo? Magnam labore sapiente pariatur quisquam praesentium ea eveniet distinctio nihil modi. Deleniti perferendis esse voluptatem quam molestiae.'],
        website: 'https://www.google.com',
        projectScope: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores obcaecati perspiciatis ut omnis sunt vel inventore corporis! Id ad, aliquam voluptatem ipsam nobis corporis accusamus perferendis dolor magnam nihil.', 'Nobis corporis, quae totam nam pariatur eaque voluptatibus veritatis exercitationem assumenda, nesciunt illo? Magnam labore sapiente pariatur quisquam praesentium ea eveniet distinctio nihil modi. Deleniti perferendis esse voluptatem quam molestiae.'],
        projectKeyResults: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores obcaecati perspiciatis ut omnis sunt vel inventore corporis! Id ad, aliquam voluptatem ipsam nobis corporis accusamus perferendis dolor magnam nihil.', 'Nobis corporis, quae totam nam pariatur eaque voluptatibus veritatis exercitationem assumenda, nesciunt illo? Magnam labore sapiente pariatur quisquam praesentium ea eveniet distinctio nihil modi. Deleniti perferendis esse voluptatem quam molestiae.'],
        logo: 'https://blog.iprocess.com.br/wp-content/uploads/2021/11/placeholder.png'
      },
      {
        name: 'Exército Brasileiro 3',
        description: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores obcaecati perspiciatis ut omnis sunt vel inventore corporis! Id ad, aliquam voluptatem ipsam nobis corporis accusamus perferendis dolor magnam nihil.', 'Nobis corporis, quae totam nam pariatur eaque voluptatibus veritatis exercitationem assumenda, nesciunt illo? Magnam labore sapiente pariatur quisquam praesentium ea eveniet distinctio nihil modi. Deleniti perferendis esse voluptatem quam molestiae.'],
        website: 'https://www.google.com',
        projectScope: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores obcaecati perspiciatis ut omnis sunt vel inventore corporis! Id ad, aliquam voluptatem ipsam nobis corporis accusamus perferendis dolor magnam nihil.', 'Nobis corporis, quae totam nam pariatur eaque voluptatibus veritatis exercitationem assumenda, nesciunt illo? Magnam labore sapiente pariatur quisquam praesentium ea eveniet distinctio nihil modi. Deleniti perferendis esse voluptatem quam molestiae.'],
        projectKeyResults: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores obcaecati perspiciatis ut omnis sunt vel inventore corporis! Id ad, aliquam voluptatem ipsam nobis corporis accusamus perferendis dolor magnam nihil.', 'Nobis corporis, quae totam nam pariatur eaque voluptatibus veritatis exercitationem assumenda, nesciunt illo? Magnam labore sapiente pariatur quisquam praesentium ea eveniet distinctio nihil modi. Deleniti perferendis esse voluptatem quam molestiae.'],
        logo: 'https://blog.iprocess.com.br/wp-content/uploads/2021/11/placeholder.png'
      },
      {
        name: 'Exército Brasileiro 4',
        description: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores obcaecati perspiciatis ut omnis sunt vel inventore corporis! Id ad, aliquam voluptatem ipsam nobis corporis accusamus perferendis dolor magnam nihil.', 'Nobis corporis, quae totam nam pariatur eaque voluptatibus veritatis exercitationem assumenda, nesciunt illo? Magnam labore sapiente pariatur quisquam praesentium ea eveniet distinctio nihil modi. Deleniti perferendis esse voluptatem quam molestiae.'],
        website: 'https://www.google.com',
        projectScope: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores obcaecati perspiciatis ut omnis sunt vel inventore corporis! Id ad, aliquam voluptatem ipsam nobis corporis accusamus perferendis dolor magnam nihil.', 'Nobis corporis, quae totam nam pariatur eaque voluptatibus veritatis exercitationem assumenda, nesciunt illo? Magnam labore sapiente pariatur quisquam praesentium ea eveniet distinctio nihil modi. Deleniti perferendis esse voluptatem quam molestiae.'],
        projectKeyResults: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores obcaecati perspiciatis ut omnis sunt vel inventore corporis! Id ad, aliquam voluptatem ipsam nobis corporis accusamus perferendis dolor magnam nihil.', 'Nobis corporis, quae totam nam pariatur eaque voluptatibus veritatis exercitationem assumenda, nesciunt illo? Magnam labore sapiente pariatur quisquam praesentium ea eveniet distinctio nihil modi. Deleniti perferendis esse voluptatem quam molestiae.'],
        logo: 'https://blog.iprocess.com.br/wp-content/uploads/2021/11/placeholder.png'
      },
      {
        name: 'Exército Brasileiro 5',
        description: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores obcaecati perspiciatis ut omnis sunt vel inventore corporis! Id ad, aliquam voluptatem ipsam nobis corporis accusamus perferendis dolor magnam nihil.', 'Nobis corporis, quae totam nam pariatur eaque voluptatibus veritatis exercitationem assumenda, nesciunt illo? Magnam labore sapiente pariatur quisquam praesentium ea eveniet distinctio nihil modi. Deleniti perferendis esse voluptatem quam molestiae.'],
        website: 'https://www.google.com',
        projectScope: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores obcaecati perspiciatis ut omnis sunt vel inventore corporis! Id ad, aliquam voluptatem ipsam nobis corporis accusamus perferendis dolor magnam nihil.', 'Nobis corporis, quae totam nam pariatur eaque voluptatibus veritatis exercitationem assumenda, nesciunt illo? Magnam labore sapiente pariatur quisquam praesentium ea eveniet distinctio nihil modi. Deleniti perferendis esse voluptatem quam molestiae.'],
        projectKeyResults: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores obcaecati perspiciatis ut omnis sunt vel inventore corporis! Id ad, aliquam voluptatem ipsam nobis corporis accusamus perferendis dolor magnam nihil.', 'Nobis corporis, quae totam nam pariatur eaque voluptatibus veritatis exercitationem assumenda, nesciunt illo? Magnam labore sapiente pariatur quisquam praesentium ea eveniet distinctio nihil modi. Deleniti perferendis esse voluptatem quam molestiae.'],
        logo: 'https://blog.iprocess.com.br/wp-content/uploads/2021/11/placeholder.png'
      },
      {
        name: 'Exército Brasileiro 6',
        description: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores obcaecati perspiciatis ut omnis sunt vel inventore corporis! Id ad, aliquam voluptatem ipsam nobis corporis accusamus perferendis dolor magnam nihil.', 'Nobis corporis, quae totam nam pariatur eaque voluptatibus veritatis exercitationem assumenda, nesciunt illo? Magnam labore sapiente pariatur quisquam praesentium ea eveniet distinctio nihil modi. Deleniti perferendis esse voluptatem quam molestiae.'],
        website: 'https://www.google.com',
        projectScope: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores obcaecati perspiciatis ut omnis sunt vel inventore corporis! Id ad, aliquam voluptatem ipsam nobis corporis accusamus perferendis dolor magnam nihil.', 'Nobis corporis, quae totam nam pariatur eaque voluptatibus veritatis exercitationem assumenda, nesciunt illo? Magnam labore sapiente pariatur quisquam praesentium ea eveniet distinctio nihil modi. Deleniti perferendis esse voluptatem quam molestiae.'],
        projectKeyResults: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores obcaecati perspiciatis ut omnis sunt vel inventore corporis! Id ad, aliquam voluptatem ipsam nobis corporis accusamus perferendis dolor magnam nihil.', 'Nobis corporis, quae totam nam pariatur eaque voluptatibus veritatis exercitationem assumenda, nesciunt illo? Magnam labore sapiente pariatur quisquam praesentium ea eveniet distinctio nihil modi. Deleniti perferendis esse voluptatem quam molestiae.'],
        logo: 'https://blog.iprocess.com.br/wp-content/uploads/2021/11/placeholder.png'
      },
      {
        name: 'Exército Brasileiro 7',
        description: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores obcaecati perspiciatis ut omnis sunt vel inventore corporis! Id ad, aliquam voluptatem ipsam nobis corporis accusamus perferendis dolor magnam nihil.', 'Nobis corporis, quae totam nam pariatur eaque voluptatibus veritatis exercitationem assumenda, nesciunt illo? Magnam labore sapiente pariatur quisquam praesentium ea eveniet distinctio nihil modi. Deleniti perferendis esse voluptatem quam molestiae.'],
        website: 'https://www.google.com',
        projectScope: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores obcaecati perspiciatis ut omnis sunt vel inventore corporis! Id ad, aliquam voluptatem ipsam nobis corporis accusamus perferendis dolor magnam nihil.', 'Nobis corporis, quae totam nam pariatur eaque voluptatibus veritatis exercitationem assumenda, nesciunt illo? Magnam labore sapiente pariatur quisquam praesentium ea eveniet distinctio nihil modi. Deleniti perferendis esse voluptatem quam molestiae.'],
        projectKeyResults: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores obcaecati perspiciatis ut omnis sunt vel inventore corporis! Id ad, aliquam voluptatem ipsam nobis corporis accusamus perferendis dolor magnam nihil.', 'Nobis corporis, quae totam nam pariatur eaque voluptatibus veritatis exercitationem assumenda, nesciunt illo? Magnam labore sapiente pariatur quisquam praesentium ea eveniet distinctio nihil modi. Deleniti perferendis esse voluptatem quam molestiae.'],
        logo: 'https://blog.iprocess.com.br/wp-content/uploads/2021/11/placeholder.png'
      },],
      paginaAtual: '/home/parceiros',
      parceiro: 0
    };
  },
};
