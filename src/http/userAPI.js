import { $authHost, $host } from "./index";
import { Token } from '../utils/storage';

export const registration = async ({ username, email, password }) => {
    const response = await $host.post('auth/registration', {
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password
    });

    Token.set(response.data.token);
    return response.data.user;
};

export const login = async ({ username, password }) => {
    const response = await $host.post('auth/login', {
        username: username.toLowerCase(),
        password
    });

    Token.set(response.data.token);
    return response.data.user;
};

export const authCheck = async () => {
    const response = await $authHost.get('auth/authentication');
    Token.set(response.data.token);
    return response.data.user;
};