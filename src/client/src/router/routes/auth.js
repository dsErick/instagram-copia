export default [
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: Login */'@/views/auth/Login')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: Register */'@/views/auth/Register')
    }
];