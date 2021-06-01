<template>

  <v-col align="bottom">
    <v-snackbar v-model="snackbar" :timeout="5000" :color=color>
      <div class="d-flex align-center">
        <span v-html="message"></span>
        <v-icon class="ml-auto" @click = "snackbar = false">mdi-close</v-icon>
      </div>
    </v-snackbar>
  </v-col>

</template>

<script>
export default {
  data: () => ({
    resolve: null,
    reject: null,
    action: '',
    snackbar: false,
    color: null,
    message: null,
  }),
  methods: {
    open({ color, message }) {
      this.snackbar = true;
      this.color = color;
      this.message = message;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    cancel() {
      this.resolve(false);
      this.snackbar = false;
    },
  },
};
</script>
