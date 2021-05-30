<template>
  <div class="d-flex align-center justify-center w-h-100">
    <user-profile/>
  </div>
</template>

<script>
import userProfile from '@/components/cards/user-profile.vue';

export default {
  data: () => ({
    show: false,
  }),
  components: {
    'user-profile': userProfile,
  },
};
</script>
