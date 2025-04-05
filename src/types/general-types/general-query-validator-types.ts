export type AccessDirectionsType = 'asc' | 'desc';

export type FormattedSortsType = Record<string, 1 | -1>;

export type QueryParamsType = {
  sortBy: string;
  sortDirection: AccessDirectionsType | AccessDirectionsType[];
  pageNumber: number;
  pageSize: number;
};

export type QueryParamsBlogsType = {
  searchNameTerm: string;
  sortBy: string | string[];
  sortDirection: AccessDirectionsType | AccessDirectionsType[];
  pageNumber: number;
  pageSize: number;
};

export type QueryParamsPostsType = {
  searchTitleTerm: string;
  sortBy: string | string[];
  sortDirection: AccessDirectionsType | AccessDirectionsType[];
  pageNumber: number;
  pageSize: number;
};

export type QueryParamsUsersType = {
  searchEmailTerm: string;
  searchLoginTerm: string;
  sortBy: string | string[];
  sortDirection: AccessDirectionsType | AccessDirectionsType[];
  pageNumber: number;
  pageSize: number;
};

export type AddParamsType = {
  formattedSorts: FormattedSortsType;
};

export type QueryParamsBlogsWithFormattedSorts = QueryParamsBlogsType & AddParamsType;
export type QueryParamsPostsWithFormattedSorts = QueryParamsPostsType & AddParamsType;
export type QueryParamsUsersWithFormattedSorts = QueryParamsUsersType & AddParamsType;

export type SearchItems = {
  searchBy: string;
  searchTerm: string;
};

export type SearchFilters = { [key: string]: { $regex: string; $options: string } };

export type VariablesForGetDataType = {
  pageSize: number;
  formattedSorts: FormattedSortsType;
  searchFilters: SearchFilters;
  skipBlogs: number;
};

export type RequestQueryVariables = {
  pageSize: number;
  formattedSorts: FormattedSortsType;
  pageNumber: number;
  searchFilters: SearchFilters;
  totalCount: number;
};
