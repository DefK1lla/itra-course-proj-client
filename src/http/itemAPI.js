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
}

export default new ItemApi();