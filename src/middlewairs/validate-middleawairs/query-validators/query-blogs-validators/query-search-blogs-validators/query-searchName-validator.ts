import { query } from 'express-validator';

export const querySearchNameTermValidator = query('searchNameTerm')
  .trim()
  .isString()
  .withMessage('shout be is string type')
  .customSanitizer((value) => value || null);
