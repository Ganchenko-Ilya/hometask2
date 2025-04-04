import { RequestQueryVariables } from '../../../types/general-types/general-query-validator-types';
import { SearchFilters } from '../../../types/general-types/general-query-validator-types';

export const variablesForGetDataSlicesFunc = <T extends RequestQueryVariables>({
  formattedSorts,
  pageNumber,
  pageSize,
  searchFilters,
  totalCount,
}: T) => {
  const skipBlogs = (pageNumber - 1) * pageSize;
  const pagesCount = Math.ceil(totalCount / pageSize);

  return {
    variablesForGetData: { pageSize, formattedSorts, skipBlogs, searchFilters },
    variablesForPagination: { pagesCount, page: pageNumber, pageSize, totalCount },
  };
};
