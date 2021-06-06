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
</style>
