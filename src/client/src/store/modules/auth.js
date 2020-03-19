import axios from 'axios';
import { login } from '@/services/AuthService';

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
        const res = await login(user);
        
        // Check for erros
        if (!res.success)
            commit('setError', res.error, { root: true });
        else 
            // Set token
            commit('setToken', res.token);

        axios.defaults.headers.common['Authorization'] = `Bearer ${res.token}`;
    }
};

const mutations = {
    setToken: (state, token) => state.token = token,
    reset: state => { state.token = ''; state.user = {}; }
};

export default {
    state,
    getters,
    actions,
    mutations
}