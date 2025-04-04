import { querySortSainitizers } from './query-sort-sanitizers/query-sort-sanitizers';
import { queryPaginationSanitizers } from './query-pagination-sanitizers/query-pagination-sanitizers';

export const queryBaseSanitizers = [...queryPaginationSanitizers, ...querySortSainitizers];
