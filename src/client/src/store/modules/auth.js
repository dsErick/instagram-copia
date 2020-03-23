import router from '@/router';
import { login, getMe, getAccessToken, logoutUser } from '@/services/AuthService';

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
            const data = await login(user);

            // Check for any error
            if (!data.success) throw data.error;
            
            // Set token
            commit('setToken', data.token);

            await dispatch('getLoggedInUser');

            router.push({ name: 'Home' });
        } catch (err) {
            dispatch('errors/setErrors', err, { root: true });
        }
    },
    async refreshAccessToken({ dispatch, commit }) {
        try {
            const data = await getAccessToken();
            
            commit('setToken', data.token);

            if (data.token) dispatch('getLoggedInUser');
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
        } catch (err) {
            dispatch('errors/setErrors', err, { root: true });
        }
    },
    async logoutUser({ dispatch, commit }) {
        try {
            const data = await logoutUser();

            // Check for any error
            if (!data.success) throw data.error;

            commit('reset');
        } catch (err) {
            router.push({ name: 'Login' });
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