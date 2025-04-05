import { query } from 'express-validator';
import { queryBaseSanitizers } from '../query-base-sanitizers/query-base-sanitizers';

const querySearchTitleTermSanitizer = query('searchTitleTerm').customSanitizer((value) => value || '');

export const queryPostsSanitizers = [...queryBaseSanitizers, querySearchTitleTermSanitizer];
