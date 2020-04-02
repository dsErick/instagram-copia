import router from '@/router';
import { getPosts, getPost, createPost, deletePost, addComment, deleteComment } from '../../services/PostService';

import modulesHandler from '@/utils/modulesHandler';

const state = {
    posts: []
};

const getters = {
    getPosts: state => state.posts
};

const actions = {
    getAllPosts: modulesHandler(async ({commit}) => {
        const data = await getPosts();
        
        if (!data.success) throw data.error;
        
        commit('setPosts', data.data);

        commit('errors/resetErrors', null, { root: true });
    }),

    getSinglePost: modulesHandler(async ({commit}, post) => {
        const data = await getPost(post);

        if (!data.success) throw data.error;
        
        commit('setPosts', data.data);

        commit('errors/resetErrors', null, { root: true });
    }),

    createPost: modulesHandler(async ({commit}, post) => {
        const data = await createPost(post);
        
        if (!data.success) throw data.error;
        
        router.push({ name: 'Home' });
        
        commit('errors/resetErrors', null, { root: true });
    }),

    deletePost: modulesHandler(async ({commit}, post) => {
        const data = await deletePost(post);

        if (!data.success) throw data.error;

        if (router.currentRoute.name === 'ShowPost') return router.push({ name: 'Home' });
        commit('deletePost', post);
    }),

    addCommentToPost: modulesHandler(async ({dispatch}, params) => {
        const data = await addComment(params);

        if (!data.success) throw data.error;

        // Recarrega os posts
        if (router.currentRoute.name === 'Home') dispatch('getAllPosts');
    }),

    deletePostComment: modulesHandler(async ({dispatch}, params) => {
        const data = await deleteComment(params);

        if (!data.success) throw data.error;

        // Recarrega os posts
        if (router.currentRoute.name === 'Home') dispatch('getAllPosts');
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