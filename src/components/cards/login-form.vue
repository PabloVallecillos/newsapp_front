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
      <v-text-field
        class="mx-1"
        v-model="user.username"
        append-icon="mdi-account-outline"
        :label="$t('username')"
        :rules="usernameRules"
        outlined
        filled
        dense
        color="dark"
      ></v-text-field>
      <v-text-field
        class="mx-1"
        v-model="user.password"
        append-icon="mdi-key-outline"
        :label="$t('password')"
        :rules="passwordRules"
        outlined
        filled
        dense
        color="dark"
        type="password"
      ></v-text-field>
      <v-row class="justify-center mx-1">
        <v-btn
          elevation="3"
          class="mb-6 mt-6 full-width"
          large
          :loading="loadingBtn.login"
          :disabled="!vModalLoginForm"
          @click="validateAndLogin"
          block
          color="var(--off)"
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
      </v-row>
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
