import router from '@/router';
import { getPosts, getPost, createPost, deletePost, addComment, deleteComment } from '../../services/PostService';

const postsHandler = fn => ({dispatch, commit}, params) => {
    Promise.resolve(fn({dispatch, commit}, params)).catch(err => {
        dispatch('errors/setErrors', err, { root: true });
    });
};

const state = {
    posts: []
};

const getters = {
    getPosts: state => state.posts
};

const actions = {
    getAllPosts: postsHandler(async ({commit}) => {
        const data = await getPosts();
        
        if (!data.success) throw data.error;
        
        commit('setPosts', data.data);

        commit('errors/resetErrors', null, { root: true });
    }),

    getSinglePost: postsHandler(async ({commit}, post) => {
        const data = await getPost(post);
        
        if (!data.success) throw data.error;
        
        commit('setPosts', data.data);

        commit('errors/resetErrors', null, { root: true });
    }),

    createPost: postsHandler(async ({commit}, post) => {
        const data = await createPost(post);
        
        if (!data.success) throw data.error;
        
        router.push({ name: 'Home' });
        
        commit('errors/resetErrors', null, { root: true });
    }),

    deletePost: postsHandler(async ({commit}, post) => {
        const data = await deletePost(post);

        if (!data.success) throw data.error;

        if (router.currentRoute.name === 'ShowPost') return router.push({ name: 'Home' });
        commit('deletePost', post);
    }),

    addCommentToPost: postsHandler(async ({dispatch}, params) => {
        const data = await addComment(params);

        if (!data.success) throw data.error;

        // Recarrega os posts
        if (router.currentRoute.name === 'Home') dispatch('getAllPosts');
        if (router.currentRoute.name === 'ShowPost') dispatch('getSinglePost', router.currentRoute.params.id);
    }),

    deletePostComment: postsHandler(async ({dispatch}, params) => {
        const data = await deleteComment(params);

        if (!data.success) throw data.error;

        // Recarrega os posts
        if (router.currentRoute.name === 'Home') dispatch('getAllPosts');
        if (router.currentRoute.name === 'ShowPost') dispatch('getSinglePost', router.currentRoute.params.id);
    })
};

const mutations = {
    setPosts: (state, posts) => state.posts = posts,
    addPost: (state, post) => state.posts.unshift(post),
    deletePost: (state, post) => state.posts = state.posts.filter(el => el._id !== post)
};

export default {
    state,
    getters,
    actions,
    mutations
}