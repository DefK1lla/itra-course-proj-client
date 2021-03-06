import { $host } from "./index";

class TagApi {
   autocomplete = async (keyword) => {
      const response = await $host.get(`tag/${keyword}`);

      return response.data;
   };

   getAll = async (keyword) => {
      const response = await $host.get('tag');

      return response.data;
   };
}

export default new TagApi();
