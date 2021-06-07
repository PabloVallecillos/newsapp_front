<template>
  <div class="w-h-100 d-flex flex-column back-gradient">
    <rectangle
      class="ml-2 rectangle mt-10"
      :width="26"
      :height="5"
      :fill="'#eeeeee'"
      :style="`--i: ${one + Math.floor(Math.random() * 77)};`"
      v-for="one in rectangles"
      :key="one"
    >
    </rectangle>
    <div
      class="d-flex align-center justify-center w-h-100"
      style="position: absolute"
    >
      <slot name="form"></slot>
    </div>
  </div>
</template>
<script>
import rectangle from '@/assets/components/rectangle.vue';

export default {
  components: {
    rectangle,
  },
  data: () => ({
    rectangles: 17,
  }),
};
</script>
<style>
.back-gradient {
  background-color: #f5f5f5;
}
.rectangle {
  -webkit-animation: run calc(3s * var(--i)) ease-in-out alternate infinite;
  position: relative;
}
@-webkit-keyframes run {
  0% {
    left: -5%;
  }
  50% {
    left: 150%;
  }
  100% {
    left: -50%;
  }
}
</style>
