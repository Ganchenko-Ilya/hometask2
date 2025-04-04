import { query } from 'express-validator';

export const querySearchTitleTermValidator = query('searchTitleTerm')
  .trim()
  .isString()
  .withMessage('shout be is string type')
  .customSanitizer((value) => value || null);
