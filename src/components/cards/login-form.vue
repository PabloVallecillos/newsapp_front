<template>
  <v-card class="mx-auto back-gradient-login-form" max-width="500">
    <v-form ref="loginForm" v-model="vModalLoginForm" lazy-validation>
      <v-col class="d-flex align-center pa-10">
        <v-icon x-large color="black" class="ml-2">mdi-newspaper-variant-multiple-outline</v-icon>
        <h1 class="ml-2 black--text">newsapp</h1>
      </v-col>
      <v-scroll-y-transition>
        <div v-if="!getIs2fa">
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
            @keydown.enter="validateAndLogin"
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
            @keydown.enter="validateAndLogin"
          ></v-text-field>
          <v-btn
            elevation="3"
            class="mr-4 ml-4 mb-4"
            style="width: 89%;"
            :loading="getLoading"
            :disabled="!vModalLoginForm"
            @click="validateAndLogin"
          >
            Login
          </v-btn>
        </div>
      </v-scroll-y-transition>
      <v-scroll-y-transition>
        <div v-if="getIs2fa">
          <v-text-field
            class="mr-4 ml-4"
            v-model="user.recoveryCode"
            prepend-inner-icon="mdi-key-outline"
            :label="$tc('recovery-codes', 2)"
            :rules="recoveryCodeRules"
            outlined
            dense
            color="grey darken-1"
            item-color="grey darken-1"
            type="password"
            @keydown.enter="validateAndLogin2fa"
          ></v-text-field>
          <v-btn
            elevation="3"
            class="mr-4 ml-4 mb-4"
            style="width: 89%;"
            :loading="getLoading"
            :disabled="!vModalLoginForm"
            @click="validateAndLogin2fa"
          >
            Login
          </v-btn>
        </div>
      </v-scroll-y-transition>
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
    <snackbar></snackbar>
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
      google: false,
      facebook: false,
    },
    user: {
      username: null,
      password: null,
      recoveryCode: null,
    },
  }),
  computed: {
    ...mapGetters('userModule', ['getUrlLoginFacebook', 'getUrlLoginGoogle', 'getLoading', 'getIs2fa']),
  },
  methods: {
    ...mapActions('userModule', ['fetchLogin', 'fetchVerificationCode']),
    validateAndLogin() {
      if (this.$refs.loginForm.validate()) {
        this.fetchLogin({ username: this.user.username, password: this.user.password });
      }
    },
    validateAndLogin2fa() {
      if (this.$refs.loginForm.validate()) {
        const data = {};
        if (true) { // check use recovery code
          data.recovery_code = this.user.recoveryCode;
        } else {
          data.code = this.user.recoveryCode;
        }
        this.fetchVerificationCode(data);
      }
    },
  },
  mixins: [validationRules],
};

</script>

<style>
.back-gradient-login-form {
  background-image: linear-gradient(0deg, rgb(238, 238, 238) 0%, rgb(255, 255, 255) 46%, rgb(238, 238, 238) 100%);
}
</style>
