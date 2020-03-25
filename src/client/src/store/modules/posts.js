import { getPosts, addComment } from '../../services/PostService';

const postsHandler = fn => ({ dispatch, commit}) => {
    Promise.resolve(fn(({dispatch, commit}))).catch(err => {
        if (err.status === 401) dispatch('auth/refreshAccessToken', null, { root: true });
    })
};

const state = {
    posts: []
};

const getters = {
    getPosts: state => state.posts
};

const actions = {
    ActionGetPosts: postsHandler(async function({ commit }) {
        const data = await getPosts();
        
        if (!data.success) throw data;
        
        commit('setPosts', data.data);
    }),

    async addCommentToPost({commit}, params) {
        const data = await addComment(params);
        console.log(commit, data);
    } 
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