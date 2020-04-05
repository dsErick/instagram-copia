import { getUsers, getUser, follow, unfollow } from '@/services/UserService';

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
    }),
    followUser: modulesHandler(async ({dispatch}, user) => {
        const data = await follow(user);
        
        if (!data.success) throw data.error;

        await dispatch('getUserByUsername', user);
        await dispatch('auth/getLoggedInUser', null, { root: true });
    }),
    unfollowUser: modulesHandler(async ({dispatch}, {followeeUser, followerUser}) => {
        const data = await unfollow({ followeeUser, followerUser });
        
        if (!data.success) throw data.error;

        await dispatch('getUserByUsername', followeeUser);
        await dispatch('auth/getLoggedInUser', null, { root: true });
    }),
    socket_newFollower({commit}, user) { console.log(commit, user); alert(`O usuário ${user} começou te seguir`) },
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