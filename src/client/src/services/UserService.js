import http from './';

import servicesHandler from '@/utils/servicesHandler';

export const getUser = servicesHandler(async (user) => {
    const { data } = await http.get(`/users/${user}`);

    return data;
});