import { requestType } from '../types/transaction-types-blogs';

export const updateBlogModel = (reqBody: requestType) => {
  const { description, name, websiteUrl } = reqBody;
  return { description, name, websiteUrl };
};
