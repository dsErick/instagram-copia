import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './view/auth/Login.vue';
import Register from './view/auth/Register.vue';
import Home from './view/Home.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/',
            name: 'Home',
            component: Home
        }
    ]
});

export default router;