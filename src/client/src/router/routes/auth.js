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
    },
    {
        path: '/emailsent',
        name: 'EmailSent',
        component: () => import(/* webpackChunkName: EmailSent */'@/views/auth/EmailSent')
    },
    {
        path: '/accountverification/:token',
        name: 'AccountVerification',
        component: () => import(/* webpackChunkName: AccountVerification */'@/views/auth/AccountVerification')
    }
];