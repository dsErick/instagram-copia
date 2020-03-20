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
    async userLogin({ dispatch, commit }, user) {
        try {
            // Get JWT
            let data = await login(user);

            // Check for any error
            if (!data.success) throw data.error;
            
            // Set token
            commit('setToken', data.token);

            return await dispatch('getLoggedInUser');
        } catch (err) {
            dispatch('errors/setErrors', err, { root: true });
        }
    },
    async getLoggedInUser({ dispatch, commit }) {
        try {
            const data = await getMe();

            // Check for any error
            if (!data.success) throw data.error;
    
            // Set user
            commit('setUser', data.data);
            
            // Reset Errors
            commit('errors/resetErrors', null, { root: true });

            return true;
        } catch (err) {
            dispatch('errors/setErrors', err, { root: true });
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
    mutations,
    namespaced: true
}