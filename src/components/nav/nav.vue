<template>
  <v-app-bar
    app
    color="grey lighten-3 elevation-1"
    dark
  >
    <div class="d-flex align-center">
      <v-icon color="black">mdi-newspaper-variant-multiple-outline</v-icon>
      <h4 class="ml-2 black--text">newsapp</h4>
    </div>

    <v-spacer></v-spacer>

    <v-menu
      open-on-hover
      offset-y
      transition="slide-x-transition"
      top
    >
      <template v-slot:activator="{ on, attrs }">
        <v-avatar
          v-if="getUser.avatar"
          color="white"
          size="36px"
          @click="$router.push({ name: 'user-details', params: { id: getUser.id } })"
          :style="{ cursor: 'pointer', zIndex: '999' }"
          v-bind="attrs"
          v-on="on"
        >
          <img
            alt="Avatar"
            :src="getUser.avatar"
          >
        </v-avatar>

        <v-avatar
          v-else
          color="white"
          size="36px"
          @click="$router.push({ name: 'user-details', params: { id: getUser.id } })"
          :style="{ cursor: 'pointer' }"
          v-bind="attrs"
          v-on="on"
        >
          <span class="black--text headline text-sm-subtitle-2">
            {{ getUser.username.charAt(0).toUpperCase() }}
          </span>
        </v-avatar>
      </template>

      <v-list dense>
        <v-list>
          <v-list-item-group
            color="red"
          >
            <v-list-item
              v-for="(item, i) in userSettings"
              :key="i"
              active-class="black--text text--accent-4"
              :to="{ ...item.to, params: { id: getUser.id }}"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="$t(item.text)"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              active-class="deep-purple--text text--accent-6"
              v-if="$store.getters['userModule/getIsUserLoggedIn']"
              @click="logout()"
            >
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('logout') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
    selectedItem: 1,
    userSettings: [
      { text: 'my-profile', icon: 'mdi-account-outline', to: { name: 'user-details' } },
    ],
  }),
  methods: {
    ...mapActions('userModule', ['logout']),
  },
  computed: {
    ...mapGetters('userModule', ['getUser']),
  },
};
</script>

<style>
</style>
