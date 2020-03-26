import http from './';

export const getPosts = async () => {
    try {
        const { data } = await http.get('/posts');

        return data;
    } catch (err) {
        return err.response.data;
    }
}

export const addComment = async (params) => {
    try {
        const { data } = await http.post(`/posts/${params.post}/comments`, { body: params.body });
        
        return data;
    } catch (err) {
        return err.response.data;
    }
}

export const deleteComment = async (params) => {
    try {
        const { data } = await http.delete(`/posts/${params.post}/comments/${params.comment}`);
        
        return data;
    } catch (err) {
        return err.response.data;
    }
}