import http from './';

export const login = async user => {
    try {
        const { data } = await http.post('/auth/login', {
            email: user.email,
            password: user.password
        });

        // Set Authorization header
        http.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

        return data;
    } catch (err) {
        return err.response.data;
    }
}

export const getMe = async () => {
    try {
        const { data } = await http.get('/auth/me');

        return data;
    } catch (err) {
        return err.response.data
    }
}

export const getAccessToken = async () => {
    try {
        const { data } = await http.post('/auth/refresh');

        // Set Authorization header
        http.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

        return data;
    } catch (err) {
        return err.response.data
    }
}

export const logoutUser = async () => {
    try {
        const { data } = await http.get('/auth/logout');
        
        return data;
    } catch (err) {
        return err.response.data;
    }
}