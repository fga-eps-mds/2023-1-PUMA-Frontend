import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { mdbDatatable } from 'mdbvue';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';

import Vue from 'vue';
import axios from 'axios';
import VueMask from 'v-mask';

import {
  faEye,
  faEyeSlash,
  faCircle,
  faAngleRight,
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { faCircle as faCircleRegular } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all';

import {
  localize,
  extend,
  ValidationProvider,
  ValidationObserver,
  setInteractionMode,
} from 'vee-validate';
import {
  // eslint-disable-next-line camelcase
  alpha_spaces,
  min,
  email,
  confirmed,
  required,
  max,
} from 'vee-validate/dist/rules';

import pt from 'vee-validate/dist/locale/pt_BR.json';
import dotenv from 'dotenv';
import moment from 'moment';
import App from './App.vue';
import router from './router';
import store from './store';
import environment from './config/environment';

import { validarCpf, validarCnpj, validarTelefone } from './utils/validators-puma';

dotenv.config();

localize('pt_BR', pt);
setInteractionMode('eager');

library.add(faEye, faEyeSlash, faCircle, faCircleRegular, faAngleRight, faAngleLeft);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('FontAwesomeIcon', FontAwesomeIcon);
Vue.component('Multiselect', Multiselect);
Vue.component('MdbDatatable', mdbDatatable);

Vue.use(VueMask);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.moment = moment;

environment.configUser();

/* Vee Validate Validations */
extend('email', {
  ...email,
  validate(value) {
    if (value) {
      return email.validate(value);
    }
    return '';
  },
  message: 'Insira um email válido',
});

extend('required', {
  ...required,
  message: 'Preenchimento obrigatório',
});

extend('min', {
  ...min,
  validate(value, { length }) {
    if (value) {
      return !(value.length < length);
    }
    return '';
  },
  params: ['length'],
  /* eslint-disable max-len */
  message: (fieldName, placeholders) => `Mínimo de ${placeholders.length} caracteres.`,
});

extend('min_array', {
  validate(value, { length }) {
    return (value.length >= Number(length));
  },
  params: ['length'],
  message: (message) => message,
});

extend('confirmed', {
  ...confirmed,
  validate(value, { target }) {
    if (value) {
      return value === target;
    }
    return '';
  },
  params: ['target'],
  message: 'As senhas devem coincidirem',
});

extend('email', {
  ...email,
  validate(value) {
    if (value) {
      return email.validate(value);
    }
    return '';
  },
  message: 'Insira um email válido',
});

extend('alpha_spaces', alpha_spaces);

extend('max', max);

extend('cnpj', {
  validate: (value) => {
    if (value.length === 18) {
      return validarCnpj(value);
    }
    return '';
  },
  message: 'CNPJ inválido',
});

extend('cpf', {
  validate: (value) => {
    if (value.length === 14) {
      return validarCpf(value);
    }
    return '';
  },
  message: 'CPF inválido',
});

extend('phoneNumber', {
  validate: (value) => {
    if (value.length === 15 || value.length === 14) {
      return validarTelefone(value);
    }
    return '';
  },
  message: 'Telefone inválido',
});

/* eslint-disable no-confusing-arrow */
Vue.filter('defaultDatePipe', (value) => value ? moment(String(value)).format : '');

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

export default axios;
