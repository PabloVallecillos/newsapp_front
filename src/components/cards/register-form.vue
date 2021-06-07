<template>
  <v-card class="mx-auto back-gradient-login-form" max-width="1000">
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
            :rules="usernameRules"
            outlined
            dense
            color="grey darken-1"
            item-color="grey darken-1"
            @keydown.enter="validateAndRegister"
          ></v-text-field>
          <v-text-field
            v-model="user.email"
            prepend-inner-icon="mdi-email-outline"
            :label="$t('email')"
            :placeholder="$t('email')"
            color="grey darken-1"
            item-color="grey darken-1"
            outlined
            dense
            @keydown.enter="validateAndRegister"
            :rules="emailRules"
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
            :rules="passwordRules"
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
            :label="$t('password-confirmation')"
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
      <v-col class="d-flex justify-center">
        <v-btn
          elevation="3"
          class="mr-4 ml-4 mb-4"
          width="30%"
          :loading="getLoading"
          :disabled="!vModalRegisterForm"
          @click="validateAndRegister"
        >
          Register
        </v-btn>
      </v-col>
    </v-form>
    <snackbar/>
  </v-card>
</template>

<script>
import validationRules from '@/utils/validationRules';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Register',
  data: () => ({
    vModalRegisterForm: false,
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
    ...mapGetters('userModule', ['getIs2fa', 'getLoading']),
  },
  methods: {
    ...mapActions('userModule', ['fetchRegister']),
    validateAndRegister() {
      console.log('readsf');
    },
  },
  mixins: [validationRules],
};

</script>

<style>
.back-gradient-login-form {
  background-image: linear-gradient(0deg, rgb(238, 238, 238) 0%, rgb(255, 255, 255) 46%, rgb(238, 238, 238) 100%);
}
@media only screen and (max-width: 960px) {
  .responsive {
    flex-direction: column;
    transition: ease all .5s !important;
  }
}
</style>
