/* eslint-disable */

import axios from 'axios'
import config from '@/config'
import { Message } from 'element-ui'
const service = axios.create({
    baseURL: config.API_URL,//process.env.NODE_ENV === 'development',
    timeout: config.API_TIMEOUT,
    headers: {
        Authorization: localStorage.getItem('Access-Token'),
    }
});
// service.defaults.headers.common['Authorization']=localStorage.getItem('Access-Token')

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        Message({
            message: error,
            type: 'error',
            duration: 5 * 1000
        })
       // console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
       // if (response.status === 200) {
            return response.data;
        // } else {
        //     Promise.reject();
        // }
    },
    error => {
        Message({
            message: error,
            type: 'error',
            duration: 5 * 1000
        })
       // console.log(error);
        return Promise.reject();
    }
);

export default service;
