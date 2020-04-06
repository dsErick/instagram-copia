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
        path: '/users/:user/followers',
        name: 'Followers',
        meta: {
            requiresAuth: true
        },
        component: () => import(/* webpackChunkNames: 'Followers' */'@/views/users/Followers')
    },
    {
        path: '/users/:user/following',
        name: 'Following',
        meta: {
            requiresAuth: true
        },
        component: () => import(/* webpackChunkNames: 'Following' */'@/views/users/Following')
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