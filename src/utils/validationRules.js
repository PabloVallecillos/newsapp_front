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
        (v) => (v && v.length >= 8) || this.$t('passwords.length'),
      ];
    },
    passwordRulesCheckConfirm() {
      return [
        ...this.passwordRules,
        this.user.password === this.user.passwordConfirmation || `${this.$t('confirm-password-2')} ${this.$t('should-be-equals-to').toLocaleLowerCase()} ${this.$t('password').toLocaleLowerCase()}`,
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
        (v) => !!v || this.$t('required_female', { entity: this.$tc('confirm-password-2') }),
        this.user.password === this.user.passwordConfirmation || `${this.$t('confirm-password-2')} ${this.$t('should-be-equals-to').toLocaleLowerCase()} ${this.$t('password').toLocaleLowerCase()}`,
      ];
    },
    passwordConfirmationRulesDialog() {
      return [
        (v) => !!v || this.$t('required_female', { entity: this.$tc('confirm-password-2') }),
      ];
    },
    emailRules() {
      return [
        (v) => !!v || this.$t('required_male', { entity: this.$t('email') }),
        (v) => /.+@.+\..+/.test(v) || this.$t('invalid-email'),
      ];
    },
    checkUsernameRules() {
      return [
        ...this.usernameRules,
        !this.getCheck.username || this.$t('username') + ' ' + this.$t('alredy-exists'),
      ];
    },
    checkEmailRules() {
      return [
        ...this.emailRules,
        !this.getCheck.email || this.$t('email') + ' ' + this.$t('alredy-exists'),
      ];
    },
    nameRules() {
      return [
        (v) => !!v || this.$t('required_male', { entity: this.$t('name') }),
      ];
    },
    lastNameRules() {
      return [
        (v) => !!v || this.$t('required_male', { entity: this.$t('lastname') }),
      ];
    },
  },
};
