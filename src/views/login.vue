<template>
  <div class="d-flex align-center justify-center w-h-100">
    <login-form/>
  </div>
</template>
<script>
import loginForm from '@/components/cards/login-form.vue';

export default {
  components: {
    'login-form': loginForm,
  },
};
</script>
