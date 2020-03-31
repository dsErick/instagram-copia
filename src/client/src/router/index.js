import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

import auth from './routes/auth';
import posts from './routes/posts';
import users from './routes/users';

Vue.use(VueRouter);

const router = new VueRouter({
    // mode: 'history',
    routes: [
        ...auth,
        ...posts,
        ...users,
        {
            path: '/',
            name: 'Home',
            meta: {
                requiresAuth: true
            },
            component: () => import(/* webpackChunkName: 'Home' */'@/views/Home')
        },
        {
            path: '*',
            component: () => import(/* webpackChunkName: '404' */'@/views/404')
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters['auth/getToken']) await store.dispatch('auth/refreshAccessToken', null, { root: true });
        if (store.getters['auth/getToken']) return next();

        next({ name: 'Login' });
    } else {
        next();
    }
})

router.afterEach((to) => {
    Vue.nextTick(() => {
      document.title = to.meta.title ? to.meta.title : 'FakeInsta';
    })
});

export default router;