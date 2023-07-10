/*eslint-disable*/
import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '../store';

Vue.use(VueRouter);

const routes = [

  {
    path: '/',
    name: 'Home Page',
    component: () => import('../components/AreaExterna/HomePage.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/home/disciplinas',
    name: 'Home Disciplinas',
    component: () => import('../components/AreaExterna/Disciplinas/Disciplina.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/home/sobre',
    name: 'Home Sobre',
    component: () => import('../components/AreaExterna/Sobre/Sobre.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/home/parceiros',
    name: 'Home ParceirosProjetos',
    component: () => import('../components/AreaExterna/ParceirosEProjetos/ParceirosProjetos.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/home/processo-submissao',
    name: 'Home ProcessoSubmissao',
    component: () => import('../components/AreaExterna/ProcessoSubmissao/ProcessoSubmissao.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/usuario/Autenticacao/Login/Login.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: () => import('../components/usuario/Autenticacao/Cadastro/Cadastro.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/recuperacao-senha',
    name: 'Recuperação Senha',
    component: () => import('../components/usuario/recovery-password/RecoveryPassword.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/atualizar-senha',
    name: 'Nova Senha',
    component: () => import('../components/usuario/new-password/NewPassword.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/projetos-plataforma',
    name: 'Consulta de Projetos',
    component: () => import('../components/projeto/consulta-projeto/ConsultaProjeto.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/projetos-plataforma/visualizar/:id',
    name: 'Visualizar Projeto',
    component: () => import('../components/projeto/ViewProject/ViewProject.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/projetos-disciplina',
    name: 'Projetos por Disciplina',
    component: () => import('../components/projeto/consulta-projeto/ConsultaProjeto.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/projetos-disciplina/visualizar/:id',
    name: 'Consulta por Disciplina Visualizar',
    component: () => import('../components/projeto/ViewProject/ViewProject.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/meus-projetos',
    name: 'Meus Projetos',
    component: () => import('../components/projeto/consulta-projeto/ConsultaProjeto.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/projetos-parceiros',
    name: 'Projetos Parceiros',
    component: () => import('../components/projeto/consulta-projeto-parceiro/ConsultaProjeto.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/projetos-parceiros/visualizar/:id',
    name: 'Visualizar Projeto Parceiro',
    component: () => import('../components/projeto/edita-projeto-parceiro/EditaProjeto.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/projetos-parceiros/cadastrar',
    name: 'Cadastro de Projeto Parceiro',
    component: () => import('../components/projeto/cadastro-projeto-parceiro/CadastroProjeto.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/meus-projetos/visualizar/:id',
    name: 'Visualizar Meu Projeto',
    component: () => import('../components/projeto/ViewMyProject/ViewMyProject.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/disciplinas',
    name: 'Disciplinas',
    component: () => import('../components/disciplina/consulta-disciplina/ConsultaDisciplina.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/disciplinas/cadastrar',
    name: 'Cadastro de Disciplina',
    component: () => import('../components/disciplina/cadastro-disciplina/CadastroDisciplina.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/disciplinas/editar/:id',
    name: 'Edição de Disciplina',
    component: () => import('../components/disciplina/cadastro-disciplina/CadastroDisciplina.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/disciplinas/visualizar/:id',
    name: 'Visualização de Disciplina',
    component: () => import('../components/disciplina/cadastro-disciplina/CadastroDisciplina.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/tipoUsuario',
    name: 'Perfis de usuário',
    component: () => import('../components/tipoUsuario/consulta-tipoUsuario/ConsultaTipoUsuario.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/tipoUsuario/cadastrar',
    name: 'Cadastro de Usuário',
    component: () => import('../components/tipoUsuario/cadastro-tipoUsuario/CadastroTipoUsuario.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/tipoUsuario/editar/:id',
    name: 'Edição de Usuário',
    component: () => import('../components/tipoUsuario/cadastro-tipoUsuario/CadastroTipoUsuario.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/tipoUsuario/visualizar/:id',
    name: 'Visualização de Usuário',
    component: () => import('../components/tipoUsuario/cadastro-tipoUsuario/CadastroTipoUsuario.vue'),
    meta: {
      requiresAuth: true,

    },
  },
  {
    path: '/turma/:classid',
    name: 'Edição de Turma',
    component: () => import('../components/turma/edicao-turma/EdicaoTurma.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/turmas',
    name: 'Visualização de Turmas',
    component: () => import('../components/turma/visualizacao-turma/VisualizacaoTurma.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/Contato',
    name: 'Contato',
    component: () => import('../components/AreaExterna/Contato/Contato.vue'),
  },
  {
    path: '/NovosProfessores',
    name: 'Novos Professores',
    component: () => import('../components/NewTeachers/NewTeachers.vue'),
  },
  {
    path: '/infoContatos',
    name: 'Informações de contato',
    component: () => import('../components/contatos/consulta-contatos/ConsultaContatos.vue'),
  },
  {
    path: '/sobre',
    name: 'Sobre',
    component: () => import('../components/sobre/consulta-sobre/ConsultaSobre.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/sobre/editar',
    name: 'Editar sobre',
    component: () => import('../components/sobre/cadastra-sobre/CadastraSobre.vue'),
  },
  {
    path: '/infoContatos/cadastrar',
    name: 'contact_register',
    props: true,
    component: () => import('../components/contatos/cadastro-contatos/CadastroContatos.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/infoContatos/visualizar/:id',
    name: 'Visualização ou Edição de Contatos',
    component: () => import('../components/contatos/cadastro-contatos/CadastroContatos.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/sobre/cadastra-saiba-mais',
    name: 'Cadastro de Saiba Mais',
    component: () => import('../components/sobre/SaibaMais/cadastra-saiba-mais/CadastraSaibaMais.vue'),
    meta: {
      requiresAuth: true,

    },
  },
  {
    path: '/destaques',
    name: 'Destaques',
    component: () => import('../components/destaques/lista-destaque/ListaDestaque.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/destaques/cadastrar',
    name: 'Cadastrar destaque',
    component: () => import('../components/destaques/cadastro-destaque/CadastroDestaque.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/destaques/editar/:id',
    name: 'Editar destaque',
    component: () => import('../components/destaques/cadastro-destaque/CadastroDestaque.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/parceiros/',
    name: 'Parceiros',
    component: () => import('../components/parceiros/consulta-parceiros/consulta-parceiros.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/parceiros/cadastrar/',
    name: 'Cadastrar Parceiro',
    component: () => import('../components/parceiros/cadastra-parceiros/CadastraParceiro.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/parceiros/editar/:id',
    name: 'Editar Parceiro',
    component: () => import('../components/parceiros/edit-parceiros/EditParceiro.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/parceiros/detalhes/:id',
    name: 'Detalhes Parceiro',
    component: () => import('../components/parceiros/detalhes-parceiros/DetalheParceiro.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/parceiros/destacar',
    name: 'Destacar Parceiro',
    component: () => import('../components/parceiros/consulta-parceiros/SelectParceiros/SelectParceiros.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/controleTipoUsuario',
    name: 'Controla Tipos de Usuário',
    component: () => import('../components/ControleTipoUsuario/ConsultaUsuario.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/sobre/editar/:id',
    name: 'Consulta Saiba Mais',
    component: () => import('../components/sobre/SaibaMais/consulta-saiba-mais/ConsultaSaibaMais.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (!store.getters.isAuthenticated) {
      next();
    } else {
      next({ path: '/' });
    }
  } else {
    next();
  }
});

export default router;
