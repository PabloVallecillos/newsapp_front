<template>
  <background>
    <template v-slot:form>
      <register/>
    </template>
  </background>
</template>

<script>
import register from '@/components/cards/register-form.vue';
import background from '@/components/background/background.vue';

export default {
  components: {
    register,
    background,
  },
};
</script>
