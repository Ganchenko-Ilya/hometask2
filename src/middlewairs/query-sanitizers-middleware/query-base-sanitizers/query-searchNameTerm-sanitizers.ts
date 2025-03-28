import { query } from 'express-validator';

export const searchNameTermSanitizer = query('searchNameTerm').customSanitizer((value) => value || '');
