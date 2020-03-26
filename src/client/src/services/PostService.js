import http from './';

const servicesHandler = fn => params => Promise.resolve(fn(params)).catch(err => { return err.response.data });

export const getPosts = servicesHandler(async () => {
    const { data } = await http.get('/posts');

    return data;
})

export const getPost = servicesHandler(async (post) => {
    const { data } = await http.get(`/posts/${post}`);

    return data;
})

export const deletePost = servicesHandler(async (post) => {
    const { data } = await http.delete(`/posts/${post}`);

    return data;
})

export const addComment = servicesHandler(async (params) => {
    const { data } = await http.post(`/posts/${params.post}/comments`, { body: params.body });
    
    return data;
})

export const deleteComment = servicesHandler(async (params) => {
    const { data } = await http.delete(`/posts/${params.post}/comments/${params.comment}`);
    
    return data;
})