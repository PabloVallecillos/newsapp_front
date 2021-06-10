<template>
  <div>
    <world style="transform: scale(0.9)"/>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <div
        style="color: transparent"
      >
        <v-toolbar
          dark
          color="grey lighten-3 elevation-1 fixed"
          height="50px"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
            class="black--text"
            small
            style="margin-left: -1px;"
            @keydown.enter="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <h3 class="font-weight-regular black--text">
            {{ country }}
          </h3>
          <v-spacer></v-spacer>
          <h3 v-if="getNews" class="font-weight-regular black--text">
            {{ getNews.totalResults }} {{ $t('news') }}
          </h3>
        </v-toolbar>
        <div v-if="getNews" >
          <v-card
            :loading="false"
            class="mx-auto my-12 mb-4"
            max-width="500"
            v-for="(item, index) in getNews.articles"
            :key="index"
          >
            <template slot="progress">
              <v-progress-linear
                color="orange lighten-2"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-img
              height="250"
              :src="item.urlToImage"
            ></v-img>

            <v-card-title>{{ item.title }}</v-card-title>

            <v-card-text>
              <v-row
                align="center"
                class="mx-0"
              >
                <div class="grey--text">
                  {{ item.author }}
                </div>
                <div class="ms-4 text-subtitle-1">
                  {{ item.publishedAt.toLocaleString().substring(0, 10) }}
                </div>
                <v-rating
                  :value="Math.floor(Math.random() * 5)"
                  color="orange lighten-2"
                  item-color="orange lighten-2"
                  dense
                  half-increments
                  readonly
                  size="14"
                  class="ml-3"
                ></v-rating>
              </v-row>
              <v-divider class="mx-auto mb-4 mt-6"></v-divider>

              <div>
                {{ item.description }}
              </div>
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="orange lighten-2"
                text
                :href="item.url"
                target="_blank"
              >
                {{ item.source.name }}
              </v-btn>
              <ShareNetwork
                network="facebook"
                :url="item.url"
                :title="item.title"
                :description="item.description"
                :quote="item.content"
                :hashtags="item.source.name"
                style="text-decoration: none"
              >
                <v-icon>
                  mdi-facebook
                </v-icon>
              </ShareNetwork>
              <ShareNetwork
                network="twitter"
                :url="item.url"
                :title="item.title"
                :description="item.description"
                :quote="item.content"
                :hashtags="item.source.name"
                style="text-decoration: none"
                class="ml-2"
              >
                <v-icon>
                  mdi-twitter
                </v-icon>
              </ShareNetwork>
              <ShareNetwork
                network="linkedin"
                :url="item.url"
                :title="item.title"
                :description="item.description"
                :quote="item.content"
                :hashtags="item.source.name"
                style="text-decoration: none"
                class="ml-2"
              >
                <v-icon>
                  mdi-linkedin
                </v-icon>
              </ShareNetwork>
              <v-icon v-if="showFilledHeart === ''" class="ml-auto mr-2" @click="showFilledHeart = item.author">
                mdi-heart-outline
              </v-icon>
              <v-icon v-else-if="showFilledHeart === item.author" class="ml-auto mr-2">
                mdi-heart
              </v-icon>
              <v-icon v-else class="ml-auto mr-2" @click="showFilledHeart = item.author">
                mdi-heart-outline
              </v-icon>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import world from '@/assets/components/world.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    world,
  },
  data: () => ({
    showFilledHeart: '',
    dialog: false,
    country: '',
    notifications: false,
    sound: true,
    widgets: false,
  }),
  computed: {
    ...mapGetters('newsModule', ['getNews']),
  },
  mounted() {
    console.log(this.getNews);
  },
};
</script>
<style>
.v-dialog--fullscreen {
  border-radius: 0;
  margin: 0;
  height: 100%;
  position: fixed;
  overflow-y: auto;
  top: 65px;
  left: 0;
  padding: 100px;
}
.fixed {
  position: fixed;
  width: 100%;
  z-index: 99;
  top: 57px;
  left: 0;
}
.new {
  margin-left: 45%;
}
@media only screen and (max-width: 600px) {
  .new {
    margin-left: 33.3vw;
  }
}
</style>
