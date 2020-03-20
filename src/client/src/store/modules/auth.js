import { login, getMe } from '@/services/AuthService';

const state = {
    token: '',
    user: {}
};

const getters = {
    getToken: state => state.token,
    getUser: state => state.user
};

const actions = {
    async logInUser({ commit }, user) {
        try {
            // Get JWT
            let data = await login(user);

            // Check for any error
            if (!data.success) throw data.error;
            
            // Set token
            commit('setToken', data.token);

            // Get User
            data = await getMe();

            // Check for any error
            if (!data.success) throw data.error;

            // Set user
            commit('setUser', data.data); 

            commit('resetErrors', { root: true });
        } catch (err) {
            commit('setError', err, { root: true });
        }
    }
};

const mutations = {
    setToken: (state, token) => state.token = token,
    setUser: (state, user) => state.user = user,
    reset: state => { state.token = ''; state.user = {}; }
};

export default {
    state,
    getters,
    actions,
    mutations
}