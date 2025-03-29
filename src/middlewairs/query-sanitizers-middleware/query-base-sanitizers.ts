import { queryPaginationSanitizers } from './query-base-sanitizers/query-pagination-sanitizers';
import { searchNameTermSanitizer } from './query-base-sanitizers/query-searchNameTerm-sanitizers';
import { querySortSainitizersCreate } from './query-base-sanitizers/query-sort-sanitizers';

export const queryBaseSanitizers = (isCreatedPostByBlogId = false) => [
  ...queryPaginationSanitizers,
  searchNameTermSanitizer,
  querySortSainitizersCreate(isCreatedPostByBlogId),
];
