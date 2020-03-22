import http from './';

export const getPosts = async () => {
    try {
        const { data } = await http.get('/posts');

        return data;
    } catch (err) {
        return err.response;
    }
} 