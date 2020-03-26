export default [
    {
        path: '/posts/:id',
        name: 'ShowPost',
        meta: {
            requiresAuth: true
        },
        component: () => import(/* webpackChunkName: ShowPost */'@/views/posts/ShowPost')
    },
]