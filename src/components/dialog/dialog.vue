<template>
  <v-dialog
    v-model="getDialog.show"
    :max-width="getDialog.options.width"
    :style="{ zIndex: getDialog.options.zIndex }"
    @keydown.esc="getDialog.show = false"
  >
    <v-card>
      <v-toolbar dark :color="getDialog.options.vToolBar.color" dense flat>
        <v-toolbar-title :class="getDialog.options.vToolBar.class">
          {{ $t(getDialog.options.vToolBar.title) }}
        </v-toolbar-title>
      </v-toolbar>
      <div class="pt-4 pl-4 pr-4 mb-n2 mx-1">
        <slot name="component"></slot>
      </div>
      <v-card-actions class="pt-4">
        <div
          v-if="getDialog.options.vCardActions.value"
          class="d-flex"
          style="width: 100%"
        >
          <v-icon
            @click="onClickClose"
            color="orange lighten-2"
          >
            mdi-close
          </v-icon>
          <v-icon
            @click="onClickCheck"
            color="orange darken-2"
            class="ml-auto"
          >
            mdi-check
          </v-icon>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('dialogModule', ['getDialog']),
  },
  props: {
    onClickCheck: Function,
    onClickClose: Function,
  },
};
</script>
