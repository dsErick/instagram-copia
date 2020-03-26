import { getPosts, getPost, addComment, deleteComment } from '../../services/PostService';
import router from '@/router';

const postsHandler = fn => ({dispatch, commit}, params) => {
    Promise.resolve(fn({dispatch, commit}, params)).catch(err => {
        // if (err.status === 401) return dispatch('auth/refreshAccessToken', null, { root: true });
        console.log(err);
        dispatch('errors/setErrors', err, { root: true });
    })
};

const state = {
    posts: []
};

const getters = {
    getPosts: state => state.posts
};

const actions = {
    getAllPosts: postsHandler(async ({ commit }) => {
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
    setPosts: (state, posts) => state.posts = posts
};

export default {
    state,
    getters,
    actions,
    mutations
}