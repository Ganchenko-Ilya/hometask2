export type AccessSortNamesType = 'createdAt' | 'name';
export type AccessDirectionsType = 'asc' | 'desc';

export type FormattedSortsType = Record<string, 1 | -1>;

export type QueryParamsType = {
  searchNameTerm: string;
  sortBy: AccessSortNamesType | AccessSortNamesType[];
  sortDirection: AccessDirectionsType | AccessDirectionsType[];
  pageNumber: number;
  pageSize: number;
};

export type QueryParamsWithFormattedSorts = QueryParamsType & { formattedSorts: FormattedSortsType };

export type VariablesForGetBlogsType = {
  pageSize: number;
  searchNameTerm: string;
  formattedSorts: FormattedSortsType;
  skipBlogs: number;
};
