import { queryBaseSanitizers } from '../query-base-sanitizers/query-base-sanitizers';
import { query } from 'express-validator';

const searchLoginTermSanitizer = query('searchLoginTerm')
  .trim()
  .customSanitizer((value) => value || null);

const searchEmailTermSanitizer = query('searchEmailTerm')
  .trim()
  .customSanitizer((value) => value || null);

export const queryUsersSanitizers = [...queryBaseSanitizers, searchLoginTermSanitizer, searchEmailTermSanitizer];
