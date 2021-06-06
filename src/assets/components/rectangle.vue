<template>
  <svg
    width="52"
    height="10"
    viewBox="0 0 52 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect :width="width" :height="height" rx="2" :fill="fillColor"/>
  </svg>
</template>
<script>
export default {
  props: {
    width: Number,
    height: Number,
    fillColor: String,
  },
};
</script>
