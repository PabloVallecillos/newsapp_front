<template>
  <v-app>
    <custom-nav v-if="$store.getters['userModule/getIsUserLoggedIn']"/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import nav from '@/components/nav/nav.vue';

export default {
  name: 'App',
  components: {
    'custom-nav': nav,
  },
  beforeCreate() {
    this.$vuetify.theme.dark = localStorage.getItem('newsapp_theme_dark') === 'true';
  },
};
</script>

<style>
.w-h-100 {
  width: 100%;
  height: 100%;
}
.v-input__icon--prepend-inner {
  margin-right: 8px !important;
}
::-moz-selection {
  color: black;
  background: #ffca45 !important
}
::selection {
  color: black;
  background: #ffca45 !important
}
.bounce-enter-active {
  animation: bounce-in .5s ease-in-out;
}
.bounce-leave-active {
  animation: bounce-in .5s alternate-reverse;
}
@keyframes bounce-in {
  0% {
    transform: translateX(150%);
  }
  100% {
    /*transform: translateX(0);*/
    transform: none !important;
  }
}
.back-gradient-login-form {
  background-image: linear-gradient(0deg, rgb(238, 238, 238) 0%, rgb(255, 255, 255) 46%, rgb(238, 238, 238) 100%);
}
</style>
