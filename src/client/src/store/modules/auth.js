import router from '@/router';
import { register, accountVerification, resendToken, login, logout, getMe, getAccessToken, forgotPassword, resetPassword } from '@/services/AuthService';

const asyncHandler = fn => ({dispatch, commit}, params) => Promise.resolve(fn({dispatch, commit}, params)).catch(err => { dispatch('errors/setErrors', err, { root: true }) });

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
    registerUser: asyncHandler(async ({ commit }, user) => {
        const data = await register(user);

        // Check for any error
        if (!data.success) throw data.error;

        // Reset Errors
        commit('errors/resetErrors', null, { root: true });

        router.push({ name: 'EmailSent', query: { email: data.data }});
    }),

    // @desc    Account verification
    verifyNewUser: asyncHandler(async ({ dispatch, commit }, params) => {
        const data = await accountVerification(params);
        
        // Check for any error
        if (!data.success) throw data.error;

        // Set token
        commit('setToken', data.token);

        await dispatch('getLoggedInUser');

        router.push({ name: 'Home' });
    }),

    // @desc    Resend Verification Email
    resendVerificationEmail: asyncHandler(async ({ commit }, email) => {
        const data = await resendToken(email);

        // Check for any error
        if (!data.success) throw data.error;

        // Reset Errors
        commit('errors/resetErrors', null, { root: true });

        return true;
    }),

    // @desc    Login User
    userLogin: asyncHandler(async ({ dispatch, commit }, user) => {
        // Get JWT
        const data = await login(user);

        // Check for any error
        if (!data.success) throw data.error;
        
        // Set token
        commit('setToken', data.token);

        await dispatch('getLoggedInUser');

        router.push({ name: 'Home' });
    }),

    // @desc    User logout
    userLogout: asyncHandler(async ({ dispatch, commit }) => {
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
    }),

    // @desc    Get logged in user info and set to state
    getLoggedInUser: asyncHandler(async ({ commit }) => {
        const data = await getMe();

        // Check for any error
        if (!data.success) throw data.error;

        // Set user
        commit('setUser', data.data);
        
        // Reset Errors
        commit('errors/resetErrors', null, { root: true });
    }),
    
    // @desc    Refresh access token by refresh and jwt on cookies
    refreshAccessToken: asyncHandler(async ({ dispatch, commit }) => {
        const data = await getAccessToken();
        
        commit('setToken', data.token);

        if (data.token) dispatch('getLoggedInUser');
    }),

    // @desc    Send reset password email to user
    sendForgotPasswordEmail: asyncHandler(async ({commit}, email) => {
        const data = await forgotPassword(email);

        // Check for any error
        if (!data.success) throw data.error;
        
        commit('errors/resetErrors', null, { root: true });

        return data.data;
    }),

    // @desc    Reset user account password
    resetUserPassword: asyncHandler(async ({dispatch, commit}, user) => {
        const data = await resetPassword(user);

        // Check for any error
        if (!data.success) throw data.error;

        // Set token
        commit('setToken', data.token);

        await dispatch('getLoggedInUser');

        router.push({ name: 'Home' });
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