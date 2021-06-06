import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
// icon
import spain from '@/assets/components/spain.vue';
import england from '@/assets/components/united-kingdom.vue';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      dark: {
      },
      light: {
      },
    },
  },
  icons: {
    values: {
      spanish: {
        component: spain,
      },
      english: {
        component: england,
      },
    },
  },
});
