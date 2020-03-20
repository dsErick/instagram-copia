import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

import auth from './routes/auth';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        ...auth,
        {
            path: '/',
            name: 'Home',
            meta: {
                requiresAuth: true
            },
            component: () => import('@/views/Home')
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters['auth/getToken']) return next();
        next({ name: 'Login' });
    } else {
        next();
    }
})

export default router;