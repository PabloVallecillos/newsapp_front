<template>
  <transition name="bounce">
    <v-card v-if="show" class="mx-auto back-gradient-login-form" max-width="500">
      <v-form ref="loginForm" v-model="vModalLoginForm" lazy-validation>
        <v-col class="d-flex justify-center pa-10">
          <v-icon x-large color="black" class="ml-2">mdi-newspaper-variant-multiple-outline</v-icon>
          <h1 class="ml-2 black--text">newsapp</h1>
        </v-col>
        <v-scroll-y-transition>
          <div v-if="!getIs2fa || !user.show2faForm">
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
              {{ $t('login') }}
            </v-btn>
            <div class="d-flex justify-center mb-4">
              <h5 class="font-weight-medium">
                {{ $t('if-you-want') }}
              </h5>
              <h5 class="ml-1 orange--text lighten-2" @click="$router.push({ name: 'register' })" style="cursor: pointer">
                {{ $t('register').toLocaleLowerCase() }}
              </h5>
            </div>
          </div>
        </v-scroll-y-transition>
        <v-scroll-y-transition>
          <div v-if="getIs2fa && user.show2faForm">
            <v-text-field
              class="mr-4 ml-4"
              v-model="user.recoveryCode"
              prepend-inner-icon="mdi-key-outline"
              :label="user.checkRecoveryOrCode ? $t('code') : $tc('recovery-codes', 2)"
              :rules="user.checkRecoveryOrCode ?  codeRules : recoveryCodeRules"
              outlined
              dense
              color="grey darken-1"
              item-color="grey darken-1"
              type="password"
              @keydown.enter="validateAndLogin2fa"
            ></v-text-field>
            <v-checkbox
              v-model="user.checkRecoveryOrCode"
              :label="$t('use', { word: $t('code') })"
              color="grey darken-1"
              item-color="grey darken-1"
              class="mt-n2 ml-4"
              style="width: fit-content"
            ></v-checkbox>
            <v-btn
              elevation="3"
              class="mr-4 ml-4 mb-4"
              width="-webkit-fill-available"
              :loading="getLoading"
              :disabled="!vModalLoginForm"
              @click="validateAndLogin2fa"
            >
              {{ $t('login') }}
            </v-btn>
          </div>
        </v-scroll-y-transition>
      </v-form>
      <snackbar></snackbar>
    </v-card>
  </transition>
</template>

<script>
import validationRules from '@/utils/validationRules';
import { mapActions, mapGetters } from 'vuex';
import { i18n } from '../../plugins/i18n';

export default {
  name: 'Login',
  data: () => ({
    vModalLoginForm: false,
    show: false,
    loadingBtn: {
      google: false,
      facebook: false,
    },
    user: {
      show2faForm: false,
      username: null,
      password: null,
      recoveryCode: null,
      checkRecoveryOrCode: false,
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
        this.user.show2faForm = true;
      }
    },
    validateAndLogin2fa() {
      if (this.$refs.loginForm.validate()) {
        const data = {};
        if (!this.user.checkRecoveryOrCode) {
          data.recovery_code = this.user.recoveryCode;
        } else {
          data.code = this.user.recoveryCode;
        }
        this.fetchVerificationCode(data);
      }
    },
  },
  mixins: [validationRules],
  beforeMount() {
    if (this.$route.query.socialregistered) {
      setTimeout(() => this.$store.dispatch('snackbarModule/showSnackbar', { color: 'green', message: this.$t('user-register', { user: this.$route.query.socialregistered }) }), 700);
    }
    this.$nextTick(() => {
      this.show = true;
    });
  },
};

</script>
