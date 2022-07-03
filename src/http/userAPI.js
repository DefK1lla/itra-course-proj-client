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

export const blockUsers = async (userIds) => {
   const response = await $authHost.put('users/block', { userIds });

   return response.data;
};

export const unblockUsers = async (userIds) => {
   const response = await $authHost.put('users/unblock', { userIds });

   return response.data;
};

export const deleteUsers = async (userIds) => {
   const response = await $authHost.delete('users', {
      params: { userIds }
   });

   return response.data;
};

export const addAdmin = async (userIds) => {
   const response = await $authHost.post('users/admin', { userIds });

   return response.data;
};

export const deleteAdmin = async (userIds) => {
   const response = await $authHost.delete('users/admin', {
      params: { userIds }
   });

   return response.data;
};
