import { requestBlogsType } from '../types/requests-types-blogs';

export const updateBlogModel = (reqBody: requestBlogsType) => {
  const { description, name, websiteUrl } = reqBody;
  return { description, name, websiteUrl };
};
