<template>
  <transition name="bounce">
    <v-card v-if="show" class="mx-auto back-gradient-login-form" max-width="1000">
    <v-form ref="registerForm" v-model="vModalRegisterForm" lazy-validation>
      <v-col class="d-flex justify-center pa-10">
        <v-icon x-large color="black" class="ml-2">mdi-newspaper-variant-multiple-outline</v-icon>
        <h1 class="ml-2 black--text">newsapp</h1>
      </v-col>
      <!-- inputs -->
      <div class="d-flex responsive px-4">
        <div class="ml-md-4 mr-md-2">
          <v-text-field
            v-model="user.username"
            prepend-inner-icon="mdi-account-outline"
            :label="$t('username')"
            color="grey darken-1"
            item-color="grey darken-1"
            outlined
            dense
            @keydown.enter="validateAndRegister"
            :rules="checkUsernameRules"
          ></v-text-field>
          <v-text-field
            v-model="user.email"
            prepend-inner-icon="mdi-account-outline"
            :label="$t('email')"
            color="grey darken-1"
            item-color="grey darken-1"
            outlined
            dense
            @keydown.enter="validateAndRegister"
            :rules="checkEmailRules"
          ></v-text-field>
        </div>
        <div class="ml-md-2 mr-md-2">
          <v-text-field
            v-model="user.name"
            prepend-inner-icon="mdi-account-outline"
            :label="$t('name')"
            color="grey darken-1"
            item-color="grey darken-1"
            outlined
            dense
            @keydown.enter="validateAndRegister"
            :rules="nameRules"
          ></v-text-field>
          <v-text-field
            v-model="user.lastname"
            prepend-inner-icon="mdi-account-outline"
            :label="$t('lastname')"
            color="grey darken-1"
            item-color="grey darken-1"
            outlined
            dense
            @keydown.enter="validateAndRegister"
            :rules="lastNameRules"
          ></v-text-field>
        </div>
        <div class="mr-md-4 ml-md-2">
          <v-text-field
            v-model="user.password"
            prepend-inner-icon="mdi-key-outline"
            :label="$t('password')"
            :rules="passwordRulesCheckConfirm"
            outlined
            dense
            color="grey darken-1"
            item-color="grey darken-1"
            type="password"
            @keydown.enter="validateAndRegister"
          ></v-text-field>
          <v-text-field
            v-model="user.passwordConfirmation"
            prepend-inner-icon="mdi-key-outline"
            :label="$t('confirm-password-2')"
            :rules="passwordConfirmationRules"
            outlined
            dense
            color="grey darken-1"
            item-color="grey darken-1"
            type="password"
            @keydown.enter="validateAndRegister"
          ></v-text-field>
        </div>
      </div>
      <!-- inputs -->
      <v-col class="d-flex responsive px-4">
        <v-btn
          style="flex: 1"
          elevation="3"
          class="ml-md-5 mr-md-2 mb-4"
          min-height="35px"
          :loading="getLoading"
          :disabled="!vModalRegisterForm"
          @click="validateAndRegister"
        >
          {{ $t('register') }}
        </v-btn>
        <v-tooltip
          :bottom="$vuetify.breakpoint.mdAndUp"
          :top="$vuetify.breakpoint.mdAndDown"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              style="flex: 1"
              class="ml-md-3 mr-md-3 mb-4"
              elevation="3"
              min-height="35px"
              :href="getUrlLoginGoogle"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-google</v-icon>
            </v-btn>
          </template>
          <span>registrarse con google</span>
        </v-tooltip>
        <v-tooltip
          :bottom="$vuetify.breakpoint.mdAndUp"
          :top="$vuetify.breakpoint.mdAndDown"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              style="flex: 1"
              elevation="3"
              min-height="35px"
              class="ml-md-2 mr-md-5"
              :href="getUrlLoginFacebook"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
          </template>
          <span>registrarse con face</span>
        </v-tooltip>
      </v-col>
    </v-form>
    <snackbar></snackbar>
    </v-card>
  </transition>
</template>

<script>
import validationRules from '@/utils/validationRules';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Register',
  data: () => ({
    vModalRegisterForm: false,
    show: false,
    user: {
      username: null,
      email: null,
      name: null,
      lastname: null,
      password: null,
      passwordConfirmation: null,
    },
  }),
  computed: {
    ...mapGetters('userModule', ['getIs2fa', 'getLoading', 'getCheck', 'getUrlLoginFacebook', 'getUrlLoginGoogle']),
  },
  methods: {
    ...mapActions('userModule', ['fetchRegister', 'fetchCheckField']),
    validateAndRegister() {
      if (this.$refs.registerForm.validate()) {
        this.fetchRegister({
          username: this.user.username,
          email: this.user.email,
          name: this.user.name,
          lastname: this.user.lastname,
          password: this.user.password,
          password_confirmation: this.user.passwordConfirmation,
        });
      }
    },
  },
  watch: {
    'user.username': function (username) {
      this.fetchCheckField({ username });
    },
    'user.email': function (email) {
      this.fetchCheckField({ email });
    },
  },
  mixins: [validationRules],
  beforeMount() {
    this.$nextTick(() => {
      this.show = true;
      this.$store.dispatch('userModule/csrfCookie');
    });
  },
};

</script>

<style>
mapsvg:geoViewBox="-169.110266 83.600842 190.486279 -58.508473"

</style>
