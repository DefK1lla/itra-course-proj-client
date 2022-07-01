import { $authHost } from "./index";

export const getUsers = async (valueToOrderBy, order, page, rowsPerPage) => {
    const response = await $authHost.get('users', {
        params: {
            valueToOrderBy,
            order,
            page,
            rowsPerPage
        }
    });
    return response.data;
};