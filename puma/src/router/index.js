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
    path: '/meus-projetos/cadastrar',
    name: 'Cadastro de Projeto',
    component: () => import('../components/projeto/cadastro-projeto/CadastroProjeto.vue'),
    meta: {
      requiresAuth: true,
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
