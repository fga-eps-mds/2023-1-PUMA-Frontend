<template>
  <div id="app">
    <link
      href="https://fonts.googleapis.com/css?family=Rubik:300,400,500,600,700,900"
      rel="stylesheet"
    >
    <MenuLateral v-if="isAuthenticated" />
    <ConfirmModal />
    <LoadingModal />
    <router-view />
  </div>
</template>

<script>

import ConfirmModal from './components/ConfirmModal/ConfirmModal.vue';
import LoadingModal from './components/LoadingModal/LoadingModal.vue';
import MenuLateral from './components/shared/menu-lateral/MenuLateral.vue';

export default {
  components: {
    MenuLateral,
    ConfirmModal,
    LoadingModal,
  },
  methods: {
    updateSessionStatus() {
      this.isAuthenticated = this.$store.getters.isAuthenticated;
    },
  },
  data() {
    return {
      isAuthenticated: false,
    };
  },
  created() {
    this.updateSessionStatus();
  },
  updated() {
    this.updateSessionStatus();
  },
  mounted() {
    document.title = 'PUMA';
  },
};
</script>

<style>
/* GLOBAL CSS */
html, body {
  margin: 0;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height:100%;
}

.main-content {
  display: block;
  position: absolute;
  top: 0;
  width: calc(100% - 250px);
  margin-left: 250px;
  padding: 30px 25px;
  margin-bottom: 50px;
  min-width: 350px;
}

@media screen and (max-width: 800px) {
  .main-content {
    display: block;
    position: relative;
    top: 0;
    width: 100%;
    margin-left: 0px;
    margin-bottom: 50px;
  }
}

.logo-puma {
  width: 184px;
  height: 56px;
  font-weight: 600;
  font-size: 48px;
  line-height: 56px;
  letter-spacing: 0.3em;
  color: #15355e;
}

.input-field {
  border: 1px solid #15355e;
  border-radius: 7px;
  font-size: 14px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  margin-left: 70px;
  margin-right: 70px;
  padding: 15px;
}

.input-field:focus {
    outline: 0;
    border: 1px solid #15355E;
}
</style>
