import { queryBaseValidators } from '../query-base-validators/query-base-validators';
import { query } from 'express-validator';

export const querySearchTitleTermValidator = query('searchTitleTerm')
  .trim()
  .isString()
  .withMessage('shout be is string type');

export const queryPostsValidators = [querySearchTitleTermValidator, ...queryBaseValidators];
