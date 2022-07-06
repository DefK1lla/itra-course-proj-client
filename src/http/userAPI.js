import { $authHost, $host } from "./index";

class UserApi {
   getAll = async (sortModel, page, rowsPerPage) => {
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

   getOneWithCollections = async (id) => {
      const response = await $host.get(`users/${id}`);
      
      return response.data;
   }

   blockUsers = async (userIds) => {
      const response = await $authHost.put('users/block', { userIds });

      return response.data;
   };

   unblockUsers = async (userIds) => {
      const response = await $authHost.put('users/unblock', { userIds });

      return response.data;
   };

   deleteUsers = async (userIds) => {
      const response = await $authHost.delete('users', {
         params: { userIds }
      });

      return response.data;
   };

   addAdmin = async (userIds) => {
      const response = await $authHost.post('users/admin', { userIds });

      return response.data;
   };

   deleteAdmin = async (userIds) => {
      const response = await $authHost.delete('users/admin', {
         params: { userIds }
      });

      return response.data;
   };
}

export default new UserApi();