import { getUser } from '@/services/UserService';

import modulesHandler from '@/utils/modulesHandler';

const state = {
    user: {}
};

const getters = {
    getUser: state => state.user
};

const actions = {
    getSingleUser: modulesHandler(async ({commit}, user) => {
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