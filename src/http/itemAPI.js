import { $authHost, $host } from "./index";

class ItemApi {
      create = async (item) => {
      const response = await $authHost.post('item', item);

      return response.data;
   };

}

export default new ItemApi();