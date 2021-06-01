<template>
  <div>

      <v-skeleton-loader
        class="mx-auto responsive-width"
        type="card, list-item@4, actions"
        width="500px"
        color
        v-if="show.skeleton"
      ></v-skeleton-loader>

      <v-card
        class="mx-auto responsive-width mt-6 mb-6"
        :loading="show.loading"
        v-else
      >
        <template slot="progress">
          <v-progress-linear color="orange lighten-2" indeterminate></v-progress-linear>
        </template>
        <v-img
          src="@/assets/default-image-user-profile.jpg"
          height="200px"
        >
          <v-col class="d-flex justify-center align-center">
            <v-hover v-slot="{ hover }" v-if="profile.avatar">
              <v-avatar
                color="white"
                size="180px"
              >
                <img
                  alt="Avatar"
                  :src="profile.avatar"
                >
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="
                  d-flex
                  align-center
                  justify-center
                  grey
                  darken-1
                  v-card--reveal
                "
                    style="height: 100%;"
                  >
                    <v-file-input
                      hide-input
                      prepend-icon="mdi-pencil-outline"
                      style="flex: 0 !important;"
                      v-model="file"
                    ></v-file-input>
                  </div>
                </v-expand-transition>
              </v-avatar>
            </v-hover>
            <v-hover v-slot="{ hover }" v-else-if="profile.username">
              <v-avatar
                color="white"
                size="180px"
              >
          <span class="black--text headline text-h1">
            {{ profile.username.charAt(0).toUpperCase() }}
          </span>
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="
                  d-flex
                  align-center
                  justify-center
                  grey
                  darken-1
                  v-card--reveal
                "
                    style="height: 100%;"
                  >
                    <v-file-input
                      hide-input
                      prepend-icon="mdi-pencil-outline"
                      style="flex: 0 !important;"
                      v-model="file"
                    ></v-file-input>
                  </div>
                </v-expand-transition>
              </v-avatar>
            </v-hover>
          </v-col>
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
        </v-img>

        <v-card-text class="mt-4 mb-n8">
          <v-text-field
            v-model="profile.username"
            prepend-inner-icon="mdi-account-outline"
            :label="$t('username')"
            color="grey darken-1"
            item-color="grey darken-1"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="profile.email"
            prepend-inner-icon="mdi-email-outline"
            :label="$t('email')"
            :placeholder="$t('email')"
            color="grey darken-1"
            item-color="grey darken-1"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="profile.name"
            prepend-inner-icon="mdi-account-outline"
            :label="$t('name')"
            color="grey darken-1"
            item-color="grey darken-1"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="profile.lastname"
            prepend-inner-icon="mdi-account-outline"
            :label="$t('lastname')"
            color="grey darken-1"
            item-color="grey darken-1"
            outlined
            dense
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="orange lighten-2"
            text
            @click="show.cardAction = !show.cardAction"
          >
            {{ $t('about-me') }}
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            icon
            @click="show.cardAction = !show.cardAction"
          >
            <v-icon>{{ show.cardAction ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show.cardAction">
            <v-divider></v-divider>

            <v-card-text>
              <v-textarea
                prepend-inner-icon="mdi-card-text-outline"
                outlined
                :label="$t('description')"
                v-model="profile.description"
                auto-grow
                hide-details
                color="grey darken-1"
                item-color="grey darken-1"
              ></v-textarea>
            </v-card-text>

            <v-divider></v-divider>
          </div>
        </v-expand-transition>
        <v-card-actions class="d-flex">
          <v-btn
            color="orange lighten-2"
            text
            class="ml-auto"
            @click="fetchEditUserProfile(fillFetchProfile())"
          >
            {{ $t('save') }}
          </v-btn>
        </v-card-actions>
        <snackbar ref="snackbar"/>
      </v-card>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'profile-card',
  data: () => ({
    show: {
      cardAction: false,
      loading: false,
      skeleton: true,
    },
    file: [],
    profile: {
      id: null,
      file: null,
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
    ...mapGetters('userModule', ['getUser', 'getIsShowSnackbar']),
  },
  methods: {
    ...mapActions('userModule', ['fetchEditUserProfile']),
    fillProfile() {
      this.profile.id = this.getUser.id;
      this.profile.email = this.getUser.email;
      this.profile.description = this.getUser.description;
      // this.profile.is_active = this.getUser.is_active;
      // this.profile.role = this.getUser.role;
      this.profile.name = this.getUser.name;
      this.profile.lastname = this.getUser.lastname;
      this.profile.username = this.getUser.username;
      this.profile.avatar = this.getUser.avatar;
    },
    fillFetchProfile() {
      this.show.loading = true;
      const data = {
        id: this.profile.id,
        username: this.profile.username,
        email: this.profile.email,
        name: this.profile.name,
        lastname: this.profile.lastname,
      };
      if (this.profile.description || this.profile.avatar) {
        data.description = this.profile.description;
        data.avatar = this.profile.avatar;
      }
      return data;
    },
  },
  watch: {
    async file(file) {
      const { type } = file;
      if (type === 'image/jpeg' || type === 'image/png' || type === 'image/jpg') {
        this.profile.file = file;
        this.profile.avatar = URL.createObjectURL(file);
      } else {
        this.$refs.snackbar.open({ color: 'red', message: this.$t('file-type') });
      }
    },
    getIsShowSnackbar() {
      this.$refs.snackbar.open({ color: 'green', message: this.$t('profile-updated') });
      this.show.loading = false;
    },
  },
  async mounted() {
    this.fillProfile();
    setTimeout(() => {
      this.show.skeleton = false;
    }, 500);
  },
};
</script>

<style>
.v-skeleton-loader__list-item, .v-skeleton-loader__card-heading, .v-skeleton-loader__actions {
  background-color: #fdfdfd !important;
}
.responsive-width {
  max-width: 500px !important;
  transition: ease all .5s !important;
}

.v-card--reveal {
  align-items: center;
  top: 0;
  justify-content: center;
  opacity: .95;
  position: absolute;
  width: 100%;
}

@media only screen and (max-width: 600px) {
  .responsive-width {
    max-width: 75vw !important;
  }
}
</style>
