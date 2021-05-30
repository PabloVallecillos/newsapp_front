<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-img
      v-if="profile.avatar"
      lazy-src="getUser.avatar"
      height="200px"
    >
      <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular
            indeterminate
            color="black lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>
    <v-hover v-else v-slot="{ hover }">
      <v-img
        src="@/assets/no-user-image.jpg"
        height="200px"
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0 grey lighten-3"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="black lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
        <v-expand-transition>
          <div
            v-if="hover"
            class="transition-fast-in-fast-out grey lighten-3 elevation-1 v-card--reveal display-3 black--text"
            style="height: 100%;"
          >
            <v-file-input
              v-model="file"
              color="black"
              prepend-icon="mdi-pencil-outline"
              hide-input
              style="position: absolute; right: 0"
            >
              <template v-slot:selection="{ index, text }">
                <v-chip
                  color="grey lighten-3"
                  dark
                  label
                  small
                >
                  {{ text }}
                </v-chip>
              </template>
            </v-file-input>
          </div>
        </v-expand-transition>
      </v-img>
    </v-hover>

    <v-card-text>
      <v-text-field
        v-model="profile.name"
        prepend-icon="mdi-account-outline"
        :label="$t('name')"
        color="grey darken-1"
        item-color="grey darken-1"
      ></v-text-field>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
      >
        {{ $t('about-me') }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
          sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you
          add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
    show: false,
    file: [],
    profile: {
      id: null,
      email: null,
      description: null,
      is_active: null,
      role: null,
      name: null,
      lastname: null,
      username: null,
      avatar: null,
    },
  }),
  computed: {
    ...mapGetters('userModule', ['getUser']),
  },
  methods: {
    ...mapActions('userModule', ['fetchEditUserProfile']),
    fillProfile() {
      this.profile.id = this.getUser.id;
      this.profile.email = this.getUser.email;
      this.profile.description = this.getUser.description;
      this.profile.is_active = this.getUser.is_active;
      this.profile.role = this.getUser.role;
      this.profile.name = this.getUser.name;
      this.profile.lastname = this.getUser.lastname;
      this.profile.username = this.getUser.username;
      this.profile.avatar = this.getUser.avatar;
    },
  },
  watch: {
    async file(file) {
      const { type } = file;
      if (type === 'image/jpeg' || type === 'image/png') {
        await this.fetchEditUserProfile(this.profile);
      }
    },
  },
  mounted() {
    this.fillProfile();
  },
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
</style>
