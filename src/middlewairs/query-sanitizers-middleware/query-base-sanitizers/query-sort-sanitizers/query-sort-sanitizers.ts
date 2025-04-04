import { query } from 'express-validator';
import { RequestHandler } from 'express';
import { AddParamsType, QueryParamsType } from '../../../../types/general-types/general-query-validator-types';

const sortBySanitizer = query('sortBy').customSanitizer((value) => {
  if (Array.isArray(value)) {
    let correctValue: string[] = [];
    for (let sort of value) {
      if (sort === '') {
        correctValue.push('createdAt');
      } else {
        correctValue.push(sort);
      }
    }
    return correctValue;
  }
  return value || 'createdAt';
});

const sortDirectionSanitizer = query('sortDirection').customSanitizer((value, { req }) => {
  const sortByValue = req.query?.sortBy;

  const isArraySortBy = Array.isArray(sortByValue);
  const sortByLength = sortByValue.length;
  const isArraySortDirection = Array.isArray(value);
  const sortDirectionLength = isArraySortDirection ? value.length : 0;

  if (isArraySortDirection && isArraySortBy) {
    if (sortByLength === sortDirectionLength) {
      return value;
    } else {
      let margeLength = sortByLength - sortDirectionLength;
      if (margeLength > 0) {
        const defaultValues = new Array(sortByLength - sortDirectionLength).fill('desc');
        return [...value, ...defaultValues];
      }
    }
  }
  if (!isArraySortDirection && isArraySortBy) {
    const defaultValues = new Array(sortByLength - 1).fill('desc');

    return !value ? ['desc', ...defaultValues] : [value, ...defaultValues];
  }
  return value || 'desc';
});

const sortSanitizer: RequestHandler<unknown, unknown, unknown, unknown> = (req, res, next) => {
  const { sortDirection, sortBy } = req.query as QueryParamsType;
  const queryWithCustomSorts = req.query as AddParamsType;

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
