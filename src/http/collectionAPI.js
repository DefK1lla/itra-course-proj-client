import { $authHost } from "./index";

export const createCollection = async (collection, fields) => {
   const response = await $authHost.post('collection', { collection, fields });

   return response.data;
};