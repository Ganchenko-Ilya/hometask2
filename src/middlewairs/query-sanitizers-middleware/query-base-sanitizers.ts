import { queryPaginationSanitizers } from './query-base-sanitizers/query-pagination-sanitizers';
import { searchNameTermSanitizer } from './query-base-sanitizers/query-searchNameTerm-sanitizers';
import { querySortSainitizers } from './query-base-sanitizers/query-sort-sanitizers';

export const queryBaseSanitizers = [...queryPaginationSanitizers, searchNameTermSanitizer, ...querySortSainitizers];
