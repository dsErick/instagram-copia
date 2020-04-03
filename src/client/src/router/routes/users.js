export default [
    {
        path: '/users/:user',
        name: 'ShowUser',
        meta: {
            requiresAuth: true
        },
        component: () => import(/* webpackChunkNames: 'ShowUser' */'@/views/users/ShowUser')
    },
    {
        path: '/users/accounts/edit',
        name: 'EditUser',
        meta: {
            requiresAuth: true
        },
        component: () => import(/* webpackChunkNames: 'EditUser' */'@/views/users/EditUser')
    },
    {
        path: '/users/accounts/password',
        name: 'EditUserPassword',
        meta: {
            requiresAuth: true
        },
        component: () => import(/* webpackChunkNames: 'EditUserPassword' */'@/views/users/EditUserPassword')
    },
    {
        path: '/users/accounts/email',
        name: 'EditUserEmail',
        meta: {
            requiresAuth: true
        },
        component: () => import(/* webpackChunkNames: 'EditUserEmail' */'@/views/users/EditUserEmail')
    }
]