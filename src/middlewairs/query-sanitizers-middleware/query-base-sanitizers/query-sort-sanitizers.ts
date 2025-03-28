import { query } from 'express-validator';
import { RequestHandler } from 'express';
import {
  QueryParamsType,
  QueryParamsWithFormattedSorts,
} from '../../../types/general-types/general-query-validator-types';

const sortBySanitizer = query('sortBy').customSanitizer((value) => value || 'createdAt');

const sortDirectionSanitizer = query('sortDirection').customSanitizer((value, { req }) => {
  const sortByValue = req.query?.sortBy;

  const isArraySortBy = Array.isArray(sortByValue);
  const isArraySortDirection = Array.isArray(value);

  const sortByLength = sortByValue.length;
  const sortDirectionLength = value.length;

  if (isArraySortDirection && isArraySortBy) {
    if (sortByLength === sortDirectionLength) {
      return value;
    } else {
      let margeLength = sortByLength - sortDirectionLength;
      if (margeLength > 0) {
        const defaultValues = new Array(sortByLength - sortDirectionLength).fill('asc');
        return [...value, ...defaultValues];
      }
    }
  }
  if (!isArraySortDirection && isArraySortBy) {
    const defaultValues = new Array(sortByLength - 1).fill('asc');

    return !value ? ['asc', ...defaultValues] : [value, ...defaultValues];
  }
  return value || 'asc';
});

const sortSanitizer: RequestHandler<unknown, unknown, unknown, unknown> = (req, res, next) => {
  const { sortDirection, sortBy } = req.query as QueryParamsType;
  const queryWithCustomSorts = req.query as QueryParamsWithFormattedSorts;

  const sorts: Record<string, 1 | -1> = {};

  const isArraySortBy = Array.isArray(sortBy);
  const isArraySortDirection = Array.isArray(sortDirection);

  if (isArraySortBy && isArraySortDirection) {
    for (let i = 0; i < sortBy.length; i++) {
      sorts[sortBy[i]] = sortDirection[i] === 'asc' ? 1 : -1;
    }
  } else {
    if (!isArraySortBy) {
      sorts[sortBy] = sortDirection === 'asc' ? 1 : -1;
    }
  }

  queryWithCustomSorts.formattedSorts = { ...sorts };

  next();
};

export const querySortSainitizers = [sortBySanitizer, sortDirectionSanitizer, sortSanitizer];
