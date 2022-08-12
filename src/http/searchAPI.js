import { $host } from './index';

class SearchApi {
   fullTextSearch = async (keyword, page, limit) => {
      const response = await $host.get(`search/fullText?keyword=${keyword}&page=${page}&limit=${limit}`);

      return response.data;
   };

   userSearch = async (keyword, sortModel, page, rowsPerPage) => {
      const response = await $host.get(`search/user?keyword=${keyword}`, {
         params: {
            orderBy: sortModel?.field,
            order: sortModel?.sort,
            page,
            rowsPerPage
         }
      });

      return response.data;
   };
}

export default new SearchApi();