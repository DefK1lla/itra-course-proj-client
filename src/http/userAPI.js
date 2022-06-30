import { $authHost } from "./index";
import { Token } from '../utils/storage';

export const getUsers = async (valueToSortBy, sortDirection, page, rowsPerPage) => {
    const response = await $authHost.get('users', { valueToSortBy, sortDirection, page, rowsPerPage });
    return response.data;
};