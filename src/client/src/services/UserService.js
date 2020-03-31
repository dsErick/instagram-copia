import http from './';

import servicesHandler from '@/utils/servicesHandler';

export const getUsers = servicesHandler(async query => {
    const { data } = await http.get(`/users?s=${query}`);

    return data;
});

export const getUser = servicesHandler(async (user) => {
    const { data } = await http.get(`/users/${user}`);

    return data;
});