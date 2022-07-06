import { $authHost } from "./index";


class FileApi {
   upload = async (formData) => {
      const response = await $authHost.post('file', formData);
   
      return response.data;
   };
}

export default new FileApi();