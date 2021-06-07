export default {
  computed: {
    usernameRules() {
      return [
        (v) => !!v || this.$t('required_male', { entity: this.$t('username') }),
      ];
    },
    passwordRules() {
      return [
        (v) => !!v || this.$t('required_female', { entity: this.$t('password') }),
      ];
    },
    recoveryCodeRules() {
      return [
        (v) => !!v || this.$t('required_male', { entity: this.$tc('recovery-codes', 2) }),
      ];
    },
    codeRules() {
      return [
        (v) => !!v || this.$t('required_male', { entity: this.$t('code') }),
      ];
    },
    passwordConfirmationRules() {
      return [
        (v) => !!v || this.$t('required_female', { entity: this.$tc('confirm-password') }),
      ];
    },
    emailRules() {
      return [
        (v) => !!v || this.$t('required_male', { entity: this.$t('') }),
      ];
    },
    nameRules() {
      return [
        (v) => !!v || this.$t('required_male', { entity: this.$t('') }),
      ];
    },
    lastNameRules() {
      return [
        (v) => !!v || this.$t('required_male', { entity: this.$t('') }),
      ];
    },
  },
};
