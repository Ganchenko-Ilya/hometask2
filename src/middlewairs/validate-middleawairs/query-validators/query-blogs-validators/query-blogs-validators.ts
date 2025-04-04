import { queryValidators } from '../query-validators';
import { querySearchNameTermValidator } from './query-search-blogs-validators/query-searchName-validator';

export const queryBlogsValidators = [querySearchNameTermValidator, ...queryValidators];
