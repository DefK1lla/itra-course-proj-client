import { $authHost } from "./index";

export const createCollection = async (collection, fields) => {
   const response = await $authHost.post('collection', { collection, fields });

   return response.data;
};

export const getCollectionWithFields = async (id) => {
   const response = await $authHost.get(`collection/${id}/edit`);

   return response.data;
};

export const updateCollection = async (id, collection, fields) => {
   const response = await $authHost.put(`collection/${id}`, { collection, fields });

   return response.data;
};