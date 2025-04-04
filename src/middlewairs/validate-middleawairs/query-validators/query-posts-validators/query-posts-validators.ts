import { queryValidators } from '../query-validators';
import { querySearchTitleTermValidator } from './query-search-posts-validators/query-searchTitleTerm-validator';

export const queryPostsValidators = [querySearchTitleTermValidator, ...queryValidators];
