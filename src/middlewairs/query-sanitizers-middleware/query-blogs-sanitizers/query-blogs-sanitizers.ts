import { queryBaseSanitizers } from '../query-base-sanitizers/query-base-sanitizers';
import { query } from 'express-validator';

export const searchNameTermSanitizer = query('searchNameTerm').customSanitizer((value) => value || '');

export const queryBlogsSanitizers = [searchNameTermSanitizer, ...queryBaseSanitizers];
