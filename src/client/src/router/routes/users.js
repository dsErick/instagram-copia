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
    }
]