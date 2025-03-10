import { requestBlogsType } from '../types/transaction-types-blogs';

export const updateBlogModel = (reqBody: requestBlogsType) => {
  const { description, name, websiteUrl } = reqBody;
  return { description, name, websiteUrl };
};
