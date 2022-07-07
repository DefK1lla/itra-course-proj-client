import { $authHost, $host } from "./index";

class CollectionApi {
   create = async (collection, fields) => {
      const response = await $authHost.post('collection', { collection, fields });

      return response.data;
   };

   getOne = async (id) => {
      const response = await $host.get(`collection/${id}`);

      return response.data;
   };

   getUserCollections = async (userId) => {
      const response = await $host.get(`collection/user/${userId}`);
      
      return response.data;
   }

   getWithFields = async (id) => {
      const response = await $authHost.get(`collection/${id}/edit`);

      return response.data;
   };

   update = async (id, collection, fields) => {
      const response = await $authHost.put(`collection/${id}`, { collection, fields });

      return response.data;
   };
}

export default new CollectionApi();