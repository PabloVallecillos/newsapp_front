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
};
</script>

<style>
.w-h-100 {
  width: 100%;
  height: 100%;
}
</style>
