<template>
  <v-app-bar
    app
    color="grey lighten-3 elevation-1"
    dark
  >
    <div class="d-flex align-center">
      <v-icon color="black">mdi-newspaper-variant-multiple-outline</v-icon>
      <h4
        class="ml-2 black--text"
        style="cursor: pointer"
        @click="$router.push({ name: 'auth' })"
      >
        newsapp
      </h4>
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
          v-if="getUser && getUser.avatar"
          color="white"
          size="36px"
          @click="$router.push({ name: 'user-details', params: { id: getUser.id } })"
          style="cursor: pointer"
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
          <span class="black--text headline text-sm-subtitle-2" v-if="getUser && getUser.username">
            {{ getUser.username.charAt(0).toUpperCase()}}
          </span>
        </v-avatar>
      </template>

      <v-list dense color="grey lighten-2">
        <v-list>
          <v-list-item-group>
            <v-list-item
              active-class="grey--text text--accent-6"
              v-if="getUser"
              :to="{ name: 'user-details', params: { id: getUser.id } }"
            >
              <v-list-item-icon>
                <v-icon>mdi-account-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('my-profile') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              active-class="grey--text text--accent-6"
              v-if="getIsUserLoggedIn"
              @click="fetchLogout()"
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
  }),
  methods: {
    ...mapActions('userModule', ['fetchLogout']),
  },
  computed: {
    ...mapGetters('userModule', ['getUser', 'getIsUserLoggedIn']),
  },
  mounted() {
    console.log(this.getUser.avatar);
  },
};
</script>

<style>
</style>
