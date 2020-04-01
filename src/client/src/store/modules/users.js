import { getUsers, getUser } from '@/services/UserService';

import modulesHandler from '@/utils/modulesHandler';

const state = {
    user: {}
};

const getters = {
    getSingleUser: state => state.user
};

const actions = {
    searchForUser: modulesHandler(async ({commit}, query) => {
        const data = await getUsers(query);

        if (!data.success) throw data.error;

        commit('errors/resetErrors', null, { root: true });

        return data.data;
    }),
    getUserByUsername: modulesHandler(async ({commit}, user) => {
        const data = await getUser(user);

        // Check for error
        if (!data.success) throw data.error;

        commit('setUser', data.data);
    })
};

const mutations = {
    setUser: (state, user) => state.user = user
};

export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
};