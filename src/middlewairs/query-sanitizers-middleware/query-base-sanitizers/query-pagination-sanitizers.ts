import { query } from 'express-validator';

const pageNumberSanitizer = query('pageNumber').customSanitizer((value) => +value || 1);

const pageSizeValidator = query('pageSize').customSanitizer((value) => +value || 10);

export const queryPaginationSanitizers = [pageNumberSanitizer, pageSizeValidator];
