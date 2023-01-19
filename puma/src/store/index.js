import Vue from 'vue';
import Vuex from 'vuex';
import * as Cookies from 'js-cookie';
import createPersistedState from 'vuex-persistedstate';

import userStore from './modules/user';
import modalStore from './modules/modal';

Vue.use(Vuex);

const userState = createPersistedState({
  paths: ['userStore'],
  plugins: [createPersistedState({
    storage: {
      getItem: (key) => {
        try {
          Cookies.get(key);
        } catch (err) {
          err.toString();
        }
      },
      setItem: (key, value) => {
        try {
          Cookies.set(key, value, { expires: 7, secure: true });
        } catch (err) {
          err.toString();
        }
      },
      removeItem: (key) => {
        try {
          Cookies.remove(key);
        } catch (err) {
          err.toString();
        }
      },
    },
  })],
});

const store = new Vuex.Store({
  modules: {
    userStore,
    modalStore,
  },
  plugins: [userState],
});

export default store;
