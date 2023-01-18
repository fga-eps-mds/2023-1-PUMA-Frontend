/* eslint-disable no-param-reassign */

const getDefaultState = () => ({
  token: null,
  user: {},
});

export default {
  // namespaced: true,
  state: getDefaultState,
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    LOGIN_USER(state, user) {
      state.user = { ...user };
    },
    RESET_USER_STATE(state) {
      Object.assign(state, getDefaultState());
    },
  },
  actions: {},
  getters: {
    isAuthenticated: (state) => !!state.token,
    user: (state) => state.user,
    token: (state) => state.token,
  },
};
