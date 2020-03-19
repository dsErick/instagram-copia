import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home.vue';

import auth from './routes/auth';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        ...auth,
        {
            path: '/',
            name: 'Home',
            component: Home
        }
    ]
});

export default router;