<template>
  <v-snackbar
    v-model="show"
  >
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        :color="color"
        text
        v-bind="attrs"
        @click="show = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="js">
export default {
  name: 'snackbar',
  props: {
    text: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  data: () => ({
    show: false,
  }),
  methods: {
    show({ text: setText, color: setColor }) {
      this.show = true;
      this.text = setText;
      this.color = setColor;
    },
  },
};
</script>
