<template>
  <background>
    <template v-slot:form>
      <login-form/>
    </template>
  </background>
</template>

<script>
import loginForm from '@/components/cards/login-form.vue';
import background from '@/components/background/background.vue';

export default {
  components: {
    'login-form': loginForm,
    background,
  },
};
</script>
