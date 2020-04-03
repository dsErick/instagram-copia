import axios from 'axios';
import NProgress from 'nprogress';
import store from '@/store';

const http = axios.create({
    baseURL: 'http://192.168.88.146:5000/api/v1',
    withCredentials: true
});

http.interceptors.request.use(req => { NProgress.start(); return req });

http.interceptors.response.use(res => { NProgress.done(); return res }, async err => {
    let originalRequest = err.config;

    if (err.response.status === 401 && !originalRequest._retry && err.response.data.error === "Para acessar esta rota é necessário fazer login.") {
        originalRequest._retry = true;

        const { data } = await http.post('/auth/refresh', null, { _retry: true });
        store.commit('auth/setToken', data.token, { root: true });
        originalRequest.headers['Authorization'] = `Bearer ${store.getters['auth/getToken']}`;
        
        return await axios(originalRequest);
    }
    
    NProgress.done();
    return Promise.reject(err);
});

export default http;