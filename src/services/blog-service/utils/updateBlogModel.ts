import { RequestBlogType } from '../../../types/blogs-types/blogs-type';

export const updateBlogModel = (reqBody: RequestBlogType) => {
  const { description, name, websiteUrl } = reqBody;
  return { description, name, websiteUrl };
};
