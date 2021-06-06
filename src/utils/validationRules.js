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
  },
};
