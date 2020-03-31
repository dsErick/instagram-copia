export default [
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: 'Login | FakeInsta'
        },
        component: () => import(/* webpackChunkName: Login */'@/views/auth/Login')
    },
    {
        path: '/register',
        name: 'Register',
        meta: {
            title: 'Cadastro | FakeInsta'
        },
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
    },
    {
        path: '/forgotpassword',
        name: 'ForgotPassword',
        component: () => import(/* webpackChunkName: ForgotPassword */'@/views/auth/ForgotPassword')
    },
    {
        path: '/resetpassword/:token',
        name: 'ResetPassword',
        component: () => import(/* webpackChunkName: ResetPassword */'@/views/auth/ResetPassword')
    }
];