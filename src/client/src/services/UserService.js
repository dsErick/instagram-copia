import http from './';

import servicesHandler from '@/utils/servicesHandler';

export const getUsers = servicesHandler(async query => {
    const { data } = await http.get(`/users?s=${query}`);

    return data;
});

export const getUser = servicesHandler(async user => {
    const { data } = await http.get(`/users/${user}`);

    return data;
});

export const follow = servicesHandler(async user => {
    const { data } = await http.put(`/users/${user}/follow`)
    
    return data;
});

export const unfollow = servicesHandler(async ({followeeUser, followerUser}) => {
    const { data } = await http.delete(`/users/unfollow`, { data: { followeeUser, followerUser }});
    
    return data;
});

export const getUserFollowers = servicesHandler(async user => {
    const { data } = await http.get(`/users/${user}/followers`);
    
    return data;
});

export const getUserFollowing = servicesHandler(async user => {
    const { data } = await http.get(`/users/${user}/following`);
    
    return data;
});