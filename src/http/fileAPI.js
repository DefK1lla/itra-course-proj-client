import { $authHost } from "./index";

export const upload = async (formData) => {
   const response = await $authHost.post('file', formData);

   return response.data;
};