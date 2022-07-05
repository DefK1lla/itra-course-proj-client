import { $authHost } from "./index";

export const upload = async (formData) => {
   console.log(1)
   const response = await $authHost.post('file', formData);
   console.log(response)
   return response.data;
};