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
      :loading="getLoading"
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
                  class="d-flex align-center justify-center grey darken-1 v-card--reveal"
                  style="height: 100%;"
                >
                  <v-file-input
                    hide-input
                    prepend-icon="mdi-pencil-outline"
                    style="flex: 0 !important;"
                    v-model="profile.file"
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
            {{
              profile.username.charAt(0)
                .toUpperCase()
            }}
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
                    v-model="profile.file"
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

      <v-toolbar
        height="10px"
        class="elevation-0"
      >
        <template v-slot:extension>
          <v-tabs
            v-model="vTabs"
            class="ml-4"
            color="dark lighten-2"
          >
            <v-tabs-slider color="orange lighten-2"></v-tabs-slider>

            <v-tab
              v-for="item in vTabsItems"
              :key="item"
            >
              {{ $t(item) }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
      <v-tabs-items v-model="vTabs">
        <v-tab-item
          v-for="item in vTabsItems"
          :key="item"
        >
          <v-card-text v-if="item === 'details'" class="mt-4 mb-n8">
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
          <v-card-actions v-if="item === 'details'">
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

          <v-expand-transition v-if="item === 'details'">
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
          <v-card-actions class="d-flex" v-if="item === 'details'">
            <v-btn
              color="orange lighten-2"
              text
              :disabled="profile.isEditedProfile"
              class="ml-auto"
              @click="fetchEditUserProfile(fillFetchProfile())"
            >
              {{ $t('save') }}
            </v-btn>
          </v-card-actions>
          <v-card-text v-if="item === 'settings'" class="">
            <v-select
              :items="settings.languages"
              v-model="selectedLanguage"
              :label="$t('select-lang')"
              prepend-inner-icon="mdi-earth"
              color="grey darken-1"
              item-color="grey darken-1"
              outlined
              dense
              item-text="literal"
              item-value="locale"
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  small
                  label
                >
                  <v-icon small v-text="data.item.icon" class="mr-2"></v-icon>
                  {{ $t(data.item.literal) }}
                </v-chip>
              </template>
              <template
                v-slot:item="{ index, item }"
              >
                <v-chip
                  small
                  label
                >
                  <v-icon small v-text="item.icon" class="mr-2"></v-icon>
                  {{ $t(item.literal) }}
                </v-chip>
              </template>
            </v-select>
            <v-flex class="d-flex flex-column justify-space-between">
              <div class="d-flex">
              <v-switch
                @click="settings.f2a.value = !settings.f2a.value"
                :input-value="settings.f2a.value"
                color="grey darken-1"
                ref="f2a"
                :label="$t('2fa', { value: $t(settings.f2a.literal) })"
              ></v-switch>
                <v-scroll-x-transition>
                  <v-icon v-if="!settings.f2a.value" class="ml-auto">
                    mdi-shield-key-outline
                  </v-icon>
                </v-scroll-x-transition>
                <v-scroll-x-transition>
                  <v-icon
                    v-if="settings.f2a.value"
                    class="mt-5"
                    style="position: absolute; right: 16px;"
                    @click="enable2fa"
                  >
                    mdi-eye-outline
                  </v-icon>
                </v-scroll-x-transition>
              </div>
              <div class="d-flex">
                <v-switch
                  :v-model="settings.themeSwitcher.value"
                  color="grey darken-1"
                  :label="$t(settings.themeSwitcher.literal, { mode: $t(settings.themeSwitcher.mode) })"
                  @change="settings.themeSwitcher.value = !settings.themeSwitcher.value"
                ></v-switch>
                <v-scroll-x-transition>
                  <v-icon v-if="!settings.themeSwitcher.value" class="ml-auto">
                    mdi-weather-night
                  </v-icon>
                </v-scroll-x-transition>
                <v-scroll-x-transition>
                  <v-icon v-if="settings.themeSwitcher.value" class="mt-5" style="position: absolute; right: 15px;">
                    mdi-weather-sunny
                  </v-icon>
                </v-scroll-x-transition>
              </div>
            </v-flex>
          </v-card-text>
        </v-tab-item>
      </v-tabs-items>
      <snackbar ref="snackbar"/>
      <dialog-custom
        :onClickClose="onClickCloseDialog"
        :onClickCheck="onClickCheckDialog"
      >
        <template v-slot:component v-if="!getUser.qrCode">
          <v-form v-model="form.passwordConfirmation" ref="passwordConfirmationForm">
            <v-text-field
              class="mt-4 mb-n4"
              v-model="profile.passwordConfirmation"
              prepend-inner-icon="mdi-key-outline"
              :label="$t('password')"
              :rules="passwordConfirmationRulesDialog"
              color="grey darken-1"
              item-color="grey darken-1"
              outlined
              dense
              type="password"
            ></v-text-field>
          </v-form>
        </template>
        <template v-slot:component v-else>
          <v-card-text class="d-flex justify-center">
            {{ $t('scan-code-or-use-verification') }}
          </v-card-text>
          <div class="d-flex align-center justify-center flex-column">
            <div v-html="getUser.qrCode"></div>
            <h4 v-text="$tc('recovery-codes', 1)" class="mb-2 mt-1"></h4>
            <div
              class="d-flex align-center flex-column justify-center"
              v-for="code in getUser.recoveryCodes"
              :key="code"
            >
            {{ code }}
            </div>
          </div>
        </template>
      </dialog-custom>
    </v-card>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import validationRules from '@/utils/validationRules';

export default {
  name: 'profile-card',
  data: () => ({
    show: {
      cardAction: false,
      skeleton: true,
    },
    settings: {
      f2a: {
        value: false,
        literal: 'enable',
      },
      themeSwitcher: {
        value: false,
        literal: 'enable-mode',
        mode: 'dark',
      },
      languages: [
        {
          locale: 'en',
          literal: 'english',
          icon: '$english',
        },
        {
          locale: 'es',
          literal: 'spanish',
          icon: '$spanish',
        },
      ],
    },
    form: {
      passwordConfirmation: false,
    },
    profile: {
      passwordConfirmation: null,
      isEditedProfile: true,
      id: null,
      email: null,
      description: null,
      is_active: null,
      role: null,
      name: null,
      lastname: null,
      username: null,
      avatar: null,
      file: [],
    },
    profileDataLoaded: false,
    vTabs: null,
    vTabsItems: ['details', 'settings'],
  }),
  computed: {
    ...mapGetters('userModule', ['getUser', 'getLoading']),
    ...mapGetters('dialogModule', ['getDialog']),
    selectedLanguage: {
      get() {
        return this.$i18n.locale;
      },
      set(val) {
        this.$i18n.locale = val;
        this.$router.push({
          name: 'user-details',
          params: {
            locale: val,
            id: this.getUser.id,
          },
        });
        return val;
      },
    },
  },
  methods: {
    ...mapActions('userModule', ['fetchEditUserProfile', 'enable2fa']),
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
      const data = {
        id: this.profile.id,
        username: this.profile.username,
        email: this.profile.email,
        name: this.profile.name,
        lastname: this.profile.lastname,
        description: this.profile.description ?? '',
      };
      if (this.profile.file) data.avatar = this.profile.file;
      return data;
    },
    onClickCloseDialog() {
      if (this.$refs.passwordConfirmationForm.validate()) {
        this.settings.f2a.value = !this.settings.f2a.value;
        this.getDialog.show = false;
        this.profile.passwordConfirmation = null;
      }
    },
    onClickCheckDialog() {
      if (this.$refs.passwordConfirmationForm.validate()) {
        if (this.settings.f2a.value) {
          this.$store.dispatch('userModule/confirmPassword2fa', {
            password: this.profile.passwordConfirmation,
          });
        } else {
          this.getDialog.show = false;
          this.$store.commit('userModule/SET_TWO_FACTOR', false);
        }
        setTimeout(() => this.profile.passwordConfirmation = null, 400);
      }
    },
  },
  watch: {
    'profile.file': function (file) {
      const { type } = file;
      if (type === 'image/jpeg' || type === 'image/png' || type === 'image/jpg') {
        this.profile.file = file;
        this.profile.avatar = URL.createObjectURL(file);
      } else {
        this.$store.dispatch('snackbarModule/showSnackbar', {
          color: 'red',
          message: this.$t('file-type'),
        });
      }
    },
    profile: {
      handler() {
        if (this.profileDataLoaded) this.profile.isEditedProfile = false;
      },
      deep: true,
    },
    'settings.themeSwitcher.value': function (val) {
      if (val) {
        this.settings.themeSwitcher.mode = 'light';
        localStorage.setItem('newsapp_theme_dark', true);
      } else {
        this.settings.themeSwitcher.mode = 'dark';
        localStorage.setItem('newsapp_theme_dark', false);
      }
      this.$vuetify.theme.dark = localStorage.getItem('newsapp_theme_dark') === 'true';
    },
    'settings.f2a.value': function (val) {
      if (val) {
        this.settings.f2a.literal = 'disable';
        if (this.profileDataLoaded) this.enable2fa();
      } else {
        this.settings.f2a.literal = 'enable';
        this.$store.dispatch('userModule/disable2fa');
      }
    },
  },
  async mounted() {
    this.settings.themeSwitcher.value = localStorage.getItem('newsapp_theme_dark') === 'true';
    this.settings.f2a.value = localStorage.getItem('newsapp_two_factor') === 'true';
    this.fillProfile();
    this.$nextTick(() => this.profileDataLoaded = true);
    setTimeout(() => this.show.skeleton = false, 100);
  },
  mixins: [validationRules],
};
</script>

<style>

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

.v-input--switch {
  width: fit-content;
}
.eye-class {
  height: fit-content;
  width: fit-content;
  align-self: center;
}

@media only screen and (max-width: 600px) {
  .responsive-width {
    max-width: 75vw !important;
  }
}
</style>
