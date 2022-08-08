import { $host } from './index';

class SearchApi {
   fullTextSearch = async (keyword, page, limit) => {
      const response = await $host.get(`search/fullText?keyword=${keyword}&page=${page}&limit=${limit}`);

      return response.data;
   };
}

export default new SearchApi();