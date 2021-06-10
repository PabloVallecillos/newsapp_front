const get = (key) => JSON.parse(localStorage.getItem(key));

const newsModule = {
  namespaced: true,
  state: {
    news: null,
  },
  getters: {
    getNews: (state) => state.news
      ?? JSON.parse(localStorage.getItem('news')),
  },
  actions: {
    async fetchNews(context, options) {
      options.params.apiKey = process.env.VUE_APP_NEWS_API_KEY;
      const queryString = Object.keys(options.params).map((key) => `${key}=${options.params[key].toLowerCase()}`).join('&');
      fetch(`https://newsapi.org/v2/${options.endpoint}?${queryString}`)
        .then((res) => res.clone().json())
        .then((res) => context.commit('SET_NEWS', res));
    },
  },
  mutations: {
    SET_NEWS: (state, news) => {
      state.news = news;
      localStorage.setItem('news', JSON.stringify(state.news));
    },
  },
};

export default newsModule;
