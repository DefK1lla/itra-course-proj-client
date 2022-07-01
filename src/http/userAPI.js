import { $authHost } from "./index";

export const getUsers = async (sortModel, page, rowsPerPage) => {
    const response = await $authHost.get('users', {
        params: {
            orderBy: sortModel?.field,
            order: sortModel?.sort,
            page,
            rowsPerPage
        }
    });

    return response.data;
};