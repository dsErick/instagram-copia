import { getPosts } from '../../services/PostService';

const state = {
    posts: []
};

const getters = {
    getPosts: state => state.posts
};

const actions = {
    async ActionGetPosts({ dispatch, commit }) {
        try {
            const data = await getPosts();
            
            if (!data.success) throw data.error;
            
            commit('setPosts', data.data);
        } catch (err) {
            dispatch('errors/setErrors', err, { root: true });
        }
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