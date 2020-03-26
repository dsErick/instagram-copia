import { getPosts, addComment, deleteComment } from '../../services/PostService';

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
    ActionGetPosts: postsHandler(async ({ commit }) => {
        const data = await getPosts();
        
        if (!data.success) throw data.error;
        
        commit('setPosts', data.data);
    }),

    addCommentToPost: postsHandler(async ({dispatch}, params) => {
        const data = await addComment(params);

        if (!data.success) throw data.error;

        // Recarrega os posts
        dispatch('ActionGetPosts');
    }),

    deletePostComment: postsHandler(async ({dispatch}, params) => {
        const data = await deleteComment(params);

        if (!data.success) throw data.error;

        // Recarrega os posts
        dispatch('ActionGetPosts');
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