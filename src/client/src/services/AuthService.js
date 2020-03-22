import http from './';

export const login = async user => {
    try {
        const { data } = await http.post('/auth/login', {
            email: user.email,
            password: user.password
        });

        // Set Authorization header
        http.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

        // Store JWT to localStorage
        localStorage.setItem('token', data.token);

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
        const { data } = await http.post('/auth/refresh', {
            token: localStorage.getItem('token')
        });

        // Set Authorization header
        http.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

        // Store JWT to localStorage
        localStorage.setItem('token', data.token);

        return data;
    } catch (err) {
        return err.response.data
    }
}