import axios from 'axios';
import store from '@/store';

const http = axios.create({
    baseURL: 'http://192.168.88.146:5000/api/v1',
    withCredentials: true
});

http.interceptors.response.use(res => { return res }, async err => {
    let originalRequest = err.config;

    if (err.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const { data } = await http.post('/auth/refresh', null, { _retry: true });
        store.commit('auth/setToken', data.token, { root: true });
        originalRequest.headers['Authorization'] = `Bearer ${store.getters['auth/getToken']}`;
        
        return await axios(originalRequest);
    }

    return Promise.reject(err);
});

export default http;