import axios from 'axios';
import { BASE_URL } from '../utils/config';
import { Token } from '../utils/storage';

const $host = axios.create({
    baseURL: BASE_URL
});

const $authHost = axios.create({
    baseURL: BASE_URL
});

const authInterceptor = config => {
    config.headers.authorization = Token.get();
    return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };