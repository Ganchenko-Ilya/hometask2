import { query } from 'express-validator';
import { handlerErrorsValidator } from '../utils/handler-errors-validator';

import { AccessDirectionsType, AccessSortNamesType } from '../../../types/general-types/general-query-validator-types';

const accessSortNames: AccessSortNamesType[] = ['createdAt', 'name'];
const accessDirections: AccessDirectionsType[] = ['asc', 'desc'];

const pageNumberValidator = query('pageNumber')
  .trim()
  .custom((value) => !value || +value > 0)
  .withMessage('pageNumber shout be more 0 ')
  .custom((value) => !!+value || !value)
  .withMessage('pageNumber shout be is  number type');

const pageSizeValidator = query('pageSize')
  .trim()
  .custom((value) => !value || +value > 0)
  .withMessage('pageSize shout be more 0 ')
  .custom((value) => !!+value || !value)
  .withMessage('pageSize shout be is  number type');

const sortByValidator = query('sortBy')
  .trim()
  .custom((value, { req }) => {
    const sortDirection = req.query?.sortDirection;
    const isArraySortDirection = Array.isArray(sortDirection);

    if (accessSortNames.includes(value) || !value) {
      if (!isArraySortDirection) {
        return true;
      }
    }
    if (Array.isArray(value)) {
      const isValidSortBy = value.every((el) => accessSortNames.includes(el));

      if (isArraySortDirection) {
        if (sortDirection.length > value.length) {
          return false;
        } else {
          return isValidSortBy;
        }
      } else {
        return isValidSortBy;
      }
    } else if (isArraySortDirection) {
      return false;
    }
    return false;
  })
  .withMessage(
    'sortBy shout be string or array with  Blog item types that  access ' +
      'for sorting and sortBy Array shout not be less sortDirection Array  ',
  );

const sortDirectionValidator = query('sortDirection')
  .trim()
  .custom((value) => {
    if (accessDirections.includes(value) || !value) {
      return true;
    }
    if (Array.isArray(value)) {
      return value.every((el) => accessDirections.includes(el));
    }
    return false;
  })
  .withMessage('sortDirection shout be string or array with types  asc | desc');

const searchNameTermValidator = query('searchNameTerm')
  .trim()
  .customSanitizer((value) => value || null);

export const queryValidators = [
  pageNumberValidator,
  pageSizeValidator,
  sortByValidator,
  sortDirectionValidator,
  searchNameTermValidator,
  handlerErrorsValidator,
];
