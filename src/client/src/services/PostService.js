import http from './';

export const getPosts = async () => {
    try {
        const { data } = await http.get('/posts');

        return data;
    } catch (err) {
        return err.response;
    }
}

export const addComment = async (params) => {
    // const { data } = await http.post(`/posts/${params.post}/comments`);
    console.log(params);
}