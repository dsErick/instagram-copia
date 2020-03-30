export default [
    {
        path: '/:user',
        name: 'ShowUser',
        meta: {
            requiresAuth: true
        },
        component: () => import(/* webpackChunkNames: ShowUser */'@/views/users/ShowUser')
    }
]