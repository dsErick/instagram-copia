import router from '@/router';
import { getUsers, getUser, follow, unfollow, getUserFollowers, getUserFollowing } from '@/services/UserService';

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

        commit('errors/resetErrors', null, { root: true });
    }),
    followUser: modulesHandler(async ({commit}, user) => {
        const data = await follow(user);
        
        // Check for errors
        if (!data.success) throw data.error;

        if (router.currentRoute.name === 'ShowUser') commit('setFollower', user);
        commit('auth/setFollowing', user, { root: true });

        commit('errors/resetErrors', null, { root: true });
    }),
    unfollowUser: modulesHandler(async ({commit}, {followeeUser, followerUser}) => {
        const data = await unfollow({followeeUser, followerUser});
        
        // Check for errors
        if (!data.success) throw data.error;

        if (router.currentRoute.name === 'ShowUser') commit('removeFollower', followeeUser);
        commit('auth/removeFollowing', followeeUser, { root: true });

        commit('errors/resetErrors', null, { root: true });
    }),
    getUserFollowers: modulesHandler(async ({commit}, user) => {
        const data = await getUserFollowers(user);
        
        if (!data.success) throw data.error;

        commit('setUser', data.data);
        commit('errors/resetErrors', null, { root: true });
    }),
    getUserFollowing: modulesHandler(async ({commit}, user) => {
        const data = await getUserFollowing(user);
        
        if (!data.success) throw data.error;

        commit('setUser', data.data);
        commit('errors/resetErrors', null, { root: true });
    }),
    socket_newFollower({commit}, user) { console.log(commit, user) },
};

const mutations = {
    setUser: (state, user) => state.user = user,
    setFollower: (state, user) => state.user.followers.unshift(user),
    removeFollower: (state, user) => {
        const index = state.user.followers.indexOf(user);
        if (index !== -1) state.user.followers.splice(index, 1);
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
};