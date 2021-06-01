<template>
  <v-card class="mx-auto" max-width="500">
    <section v-if="errors">
      <p
        style="color: red;
        text-align: center"
        class="pa-5 ma-1"
        v-html="$handleResponseErrors(errors)"
      />
    </section>
    <v-form ref="loginForm" v-model="vModalLoginForm" lazy-validation>
      <v-col class="d-flex align-center pa-10">
        <v-icon x-large color="black" class="ml-2">mdi-newspaper-variant-multiple-outline</v-icon>
        <h1 class="ml-2 black--text">newsapp</h1>
      </v-col>
      <v-text-field
        class="mr-4 ml-4"
        v-model="user.username"
        prepend-inner-icon="mdi-account-outline"
        :label="$t('username')"
        :rules="usernameRules"
        outlined
        dense
        color="grey darken-1"
        item-color="grey darken-1"
      ></v-text-field>
      <v-text-field
        class="mr-4 ml-4"
        v-model="user.password"
        prepend-inner-icon="mdi-key-outline"
        :label="$t('password')"
        :rules="passwordRules"
        outlined
        dense
        color="grey darken-1"
        item-color="grey darken-1"
        type="password"
      ></v-text-field>
      <v-btn
        elevation="3"
        class="mr-4 ml-4 mb-4"
        style="width: 89%;"
        :loading="loadingBtn.login"
        :disabled="!vModalLoginForm"
        @click="validateAndLogin"
      >
        Login
      </v-btn>
<!--        <v-btn-->
<!--          elevation="3"-->
<!--          class="mb-6 mt-6 full-width"-->
<!--          large-->
<!--          :loading="loadingBtn.google"-->
<!--          :href="getUrlLoginGoogle"-->
<!--          block-->
<!--          color="var(&#45;&#45;off)"-->
<!--        >-->
<!--          Login <v-icon class="ml-2" small>mdi-google</v-icon>-->
<!--        </v-btn>-->
<!--        <v-btn-->
<!--          elevation="3"-->
<!--          class="mb-6 mt-6 full-width"-->
<!--          large-->
<!--          :loading="loadingBtn.facebook"-->
<!--          :href="getUrlLoginFacebook"-->
<!--          block-->
<!--          color="var(&#45;&#45;off)"-->
<!--        >-->
<!--          Login <v-icon class="ml-2" small>mdi-facebook</v-icon>-->
<!--        </v-btn>-->
    </v-form>
  </v-card>
</template>

<script>
import validationRules from '@/utils/validationRules';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Login',
  data: () => ({
    vModalLoginForm: false,
    loadingBtn: {
      login: false,
      google: false,
      facebook: false,
    },
    user: {
      username: null,
      password: null,
    },
    errors: null,
  }),
  computed: {
    ...mapGetters('userModule', ['getLoginErrors', 'getUrlLoginFacebook', 'getUrlLoginGoogle']),
  },
  watch: {
    getLoginErrors(errors) {
      this.errors = errors;
    },
  },
  methods: {
    ...mapActions('userModule', ['login']),
    validateAndLogin() {
      if (this.$refs.loginForm.validate()) {
        this.loadingBtn.login = true;
        this.login({ username: this.user.username, password: this.user.password })
          .finally(() => this.loadingBtn.login = false);
      }
    },
  },
  mixins: [validationRules],
};

</script>
