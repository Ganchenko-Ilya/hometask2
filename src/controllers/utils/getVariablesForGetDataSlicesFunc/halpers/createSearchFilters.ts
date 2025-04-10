import { SearchFilters, SearchItems } from '../../../../types/general-types/general-query-validator-types';

export const createSearchFilters = (searchItems: SearchItems[]) => {
  const searchFilters: SearchFilters = { $or: [] };
  searchItems.forEach((el) => {
    searchFilters.$or.push({ [el.searchBy]: { $regex: el.searchTerm, $options: 'i' } });
  });
  if (searchFilters.$or.length) {
    return searchFilters;
  }
  return null;
};
