import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:5000/api/v1/auth'
});

export const login = async user => {
    try {
        const res = await http.post('/login', {
            email: user.email,
            password: user.password
        });
        
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

export const getMe = async () => {
    console.log('Hi');
}