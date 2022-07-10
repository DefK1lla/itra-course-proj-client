import { $authHost, $host } from "./index";

class ItemApi {
   create = async (item) => {
      const response = await $authHost.post('item', item);

      return response.data;
   };

   getForEdit = async (id) => {
      const response = await $authHost.get(`item/${id}/edit`);

      return response.data;
   };

   update = async (item, id) => {
      const response = await $authHost.put(`item/${id}`, item);

      return response.data;
   };

   getOne = async (id, userId) => {
      const response = await $host.get(`item/${id}`, { params: { userId } });
   
      return response.data;
   };

   deleteOne = async (id) => {
      const response = await $authHost.delete(`item/${id}`);
   
      return response.data;
   }

   like = async (itemId) => {
      const response = await $authHost.post(`item/${itemId}/like`);

      return response.data;
   };

   dislike = async (itemId) => {
      const response = await $authHost.delete(`item/${itemId}/like`);

      return response.data;
   };
}

export default new ItemApi();