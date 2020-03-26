export default [
    {
        path: '/posts/create',
        name: 'CreatePost',
        meta: {
            requiresAuth: true
        },
        component: () => import(/* webpackChunkName: CreatePost */'@/views/posts/CreatePost')
    },
    {
        path: '/posts/:id',
        name: 'ShowPost',
        meta: {
            requiresAuth: true
        },
        component: () => import(/* webpackChunkName: ShowPost */'@/views/posts/ShowPost')
    }
]