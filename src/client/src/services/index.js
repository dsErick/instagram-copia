import axios from 'axios';

export default axios.create({
    baseURL: 'http://192.168.88.156:5000/api/v1',
    withCredentials: true
});