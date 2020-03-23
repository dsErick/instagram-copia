import router from '@/router';
import { register, accountVerification, resendToken, login, getMe, getAccessToken, logout } from '@/services/AuthService';

const authStateHandler = fn => ({dispatch, commit}, params) => Promise.resolve(fn({dispatch, commit}, params)).catch(err => { dispatch('errors/setErrors', err, { root: true }) });

const state = {
    token: '',
    user: {}
};

const getters = {
    getToken: state => state.token,
    getUser: state => state.user
};

const actions = {
    // @desc    Register User
    registerUser: authStateHandler(async ({ commit }, user) => {
        const data = await register(user);

        // Check for any error
        if (!data.success) throw data.error;

        // Reset Errors
        commit('errors/resetErrors', null, { root: true });

        router.push({ name: 'EmailSent', query: { email: data.data }});
    }),

    // @desc    Account verification
    verifyNewUser: authStateHandler(async ({ dispatch, commit }, params) => {
        const data = await accountVerification(params);
        
        // Check for any error
        if (!data.success) throw data.error;

        // Set token
        commit('setToken', data.token);

        await dispatch('getLoggedInUser');

        router.push({ name: 'Home' });
    }),

    // @desc    Resend Verification Email
    resendVerificationEmail: authStateHandler(async ({ commit }, email) => {
        const data = await resendToken(email);

        // Check for any error
        if (!data.success) throw data.error;

        // Reset Errors
        commit('errors/resetErrors', null, { root: true });

        return true;
    }),

    // @desc    Login User
    userLogin: authStateHandler(async ({ dispatch, commit }, user) => {
        // Get JWT
        const data = await login(user);

        // Check for any error
        if (!data.success) throw data.error;
        
        // Set token
        commit('setToken', data.token);

        await dispatch('getLoggedInUser');

        router.push({ name: 'Home' });
    }),

    // @desc    Refresh access token by refresh and jwt on cookies
    refreshAccessToken: authStateHandler(async ({ dispatch, commit }) => {
        const data = await getAccessToken();
        
        commit('setToken', data.token);

        if (data.token) dispatch('getLoggedInUser');
    }),

    // @desc    Get logged in user info and set to state
    getLoggedInUser: authStateHandler(async ({ commit }) => {
        const data = await getMe();

        // Check for any error
        if (!data.success) throw data.error;

        // Set user
        commit('setUser', data.data);
        
        // Reset Errors
        commit('errors/resetErrors', null, { root: true });
    }),
    
    // @desc    User logout
    logoutUser: authStateHandler(async ({ dispatch, commit }) => {
        try {
            const data = await logout();

            // Check for any error
            if (!data.success) throw data.error;

            commit('reset');
            
            router.push({ name: 'Login' });
        } catch (err) {
            router.push({ name: 'Login' });
            dispatch('errors/setErrors', err, { root: true });
        }
    })
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