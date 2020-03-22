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

export const getJWT = async () => {
    try {
        const { data } = await http.get('/auth/token');
        
        // Set Authorization header
        http.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

        return data;
    } catch (err) {
        return err.response.data
    }
}