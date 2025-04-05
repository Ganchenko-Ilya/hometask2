import { queryBaseValidators } from '../query-base-validators/query-base-validators';
import { query } from 'express-validator';

const querySearchNameTermValidator = query('searchNameTerm').trim().isString().withMessage('shout be is string type');

export const queryBlogsValidators = [querySearchNameTermValidator, ...queryBaseValidators];
