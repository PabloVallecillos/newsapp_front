<template>

  <v-col align="bottom">
    <v-snackbar
      v-model="$store.getters['snackbarModule/getSnackbar'].show"
      :timeout="5000"
      :color="$store.getters['snackbarModule/getSnackbar'].color"
    >
      <div class="d-flex align-center">
        <span v-html="$store.getters['snackbarModule/getSnackbar'].message"></span>
        <v-spacer></v-spacer>
        <v-icon
          class="ml-4"
          @click="$store.getters['snackbarModule/getSnackbar'].show = false"
        >
          mdi-close
        </v-icon>
      </div>
    </v-snackbar>
  </v-col>

</template>
