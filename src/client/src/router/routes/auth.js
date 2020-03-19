import Login from '@/views/auth/Login.vue';
import Register from '@/views/auth/Register.vue';

export default [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    }
];