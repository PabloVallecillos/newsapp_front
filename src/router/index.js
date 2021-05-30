import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import middlewarePipeline from '@/router/middlewares/middlewarePipeline';
import setLocale from './middlewares/setLocale';
import isAuth from './middlewares/isAuth';
import auth from './middlewares/auth';

const load = (component) => () => import(`@/views/${component}.vue`);
const routerView = { template: '<router-view></router-view>' };

Vue.use(VueRouter);

const routes = [{
  path: '/:locale',
  name: 'locale',
  component: routerView,
  beforeEnter: setLocale,
  children: [
    {
      path: 'login',
      name: 'login',
      component: load('login'),
      beforeEnter: isAuth,
    },
    {
      path: 'auth',
      name: 'auth',
      component: load('auth'),
      meta: {
        middleware: [
          auth,
        ],
      },
    },
    {
      path: 'user',
      name: 'user',
      component: routerView,
      meta: {
        middleware: [
          auth,
        ],
      },
      children: [
        {
          path: 'profile/:id',
          name: 'user-details',
          component: load('user-details'),
          meta: {
            middleware: [
              auth,
            ],
          },
        },
      ]
    }
  ],
}];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const { middleware } = to.meta;
  const context = {
    to,
    from,
    next,
    store,
  };
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1), // Due to many middleware
  });
});

export default router;
