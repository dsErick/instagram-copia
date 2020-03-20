import Vue from 'vue';
import VueRouter from 'vue-router';

import auth from './routes/auth';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        ...auth,
        {
            path: '/',
            name: 'Home',
            component: () => import('@/views/Home')
        }
    ]
});

export default router;