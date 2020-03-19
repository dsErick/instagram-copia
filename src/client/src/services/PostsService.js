import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:5000/api/v1/posts'
});

export const getPosts = async token => {
    try {
        const res = await http.get('/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return res;
    } catch (err) {
        return err.response;
    }
} 