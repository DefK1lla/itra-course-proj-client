import { $authHost, $host } from './index';

class CommentApi {
   create = async (itemId, comment) => {
      const response = await $authHost.post(`comment/${itemId}`, comment);

      return response.data;
   };

   getItemComments = async (itemId, page, commentsPerPage) => {
      const response = await $host.get(`comment/${itemId}`, {
         params: {
            page,
            commentsPerPage,
         }
      });

      return response.data;
   };
}

export default new CommentApi();