import { queryBaseSanitizers } from '../query-base-sanitizers/query-base-sanitizers';
import { query } from 'express-validator';

const searchLoginTermSanitizer = query('searchLoginTerm')
  .trim()
  .customSanitizer((value) => value || '');

const searchEmailTermSanitizer = query('searchEmailTerm')
  .trim()
  .customSanitizer((value) => value || '');

export const queryUsersSanitizers = [searchLoginTermSanitizer, searchEmailTermSanitizer, ...queryBaseSanitizers];
