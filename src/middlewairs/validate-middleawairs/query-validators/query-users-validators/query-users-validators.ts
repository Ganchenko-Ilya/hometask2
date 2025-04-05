import { query } from 'express-validator';
import { queryBaseValidators } from '../query-base-validators/query-base-validators';

const searchLoginTermValidator = query('searchLoginTerm').trim().isString();
const searchEmailTerm = query('searchLoginTerm').trim().isString();

export const queryUsersValidator = [searchLoginTermValidator, searchEmailTerm, ...queryBaseValidators];
