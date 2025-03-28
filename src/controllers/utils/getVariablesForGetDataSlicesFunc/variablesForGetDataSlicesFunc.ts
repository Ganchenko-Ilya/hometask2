import { QueryParamsWithFormattedSorts } from '../../../types/general-types/general-query-validator-types';

export const variablesForGetDataSlicesFunc = (
  { formattedSorts, pageNumber, pageSize, searchNameTerm }: QueryParamsWithFormattedSorts,
  totalCount: number,
) => {
  const skipBlogs = (pageNumber - 1) * pageSize;
  const pagesCount = Math.ceil(totalCount / pageSize);
  return {
    variablesForGetData: { pageSize, searchNameTerm, formattedSorts, skipBlogs, pagesCount },
    variablesForPagination: { pageSize, totalCount, page: pageNumber, pagesCount },
  };
};
