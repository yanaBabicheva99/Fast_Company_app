import axios from 'axios';
import { toast } from 'react-toastify';
import configFile from '../config.json';

const http = axios.create({
    baseURL: configFile.apiEndPoint
});

http.interceptors.request.use(
    function (config) {
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url = (containSlash ? config.url.slice(0, -1) : config.url) + '.json';
        }
        return config;
    },
             function (error) {
                return Promise.reject(error);
             }
);
function transformData(data) {
    return data ? Object.keys(data).map(key => ({
        ...data[key]
    })) : [];
}
http.interceptors.response.use(
    (res) => {
        if (configFile.isFireBase) {
            res.data = { content: transformData(res.data) };
        }
        return res;
}, function (err) {
    const expectedErr = err.response &&
        err.response.status >= 400 &&
        err.response.status < 500;
    if (!expectedErr) {
        console.log(err);
        toast.error('Something was wrong. Try it later');
    }
    return Promise.reject(err);
});

const httpsService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
};

export default httpsService;
