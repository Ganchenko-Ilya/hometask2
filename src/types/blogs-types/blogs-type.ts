import { ObjectId } from 'mongodb';

export type RequestBlogType = {
  name: string; // max-length 15
  description: string; // max-length 500
  websiteUrl: string; // max-length 100,reg: ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
};

export type NewModelBlogType = RequestBlogType & {
  createdAt: string;
  isMembership: boolean;
} & { _id: ObjectId };

export type BlogsDbType = NewModelBlogType & { _id: ObjectId };

export type PaginationType = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
};
