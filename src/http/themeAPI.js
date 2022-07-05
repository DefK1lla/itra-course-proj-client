import { $host } from './index';

export const getThemes = async () => {
   const response = await $host.get('theme');

   return response.data;
};