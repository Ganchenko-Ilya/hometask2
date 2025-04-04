import { SearchFilters, SearchItems } from '../../../../types/general-types/general-query-validator-types';

export const createSearchFilters = (searchItems: SearchItems[]) => {
  const searchFilters: SearchFilters = {};
  searchItems.forEach((el) => {
    searchFilters[el.searchBy] = { $regex: el.searchTerm, $options: 'i' };
  });
  return searchFilters;
};
