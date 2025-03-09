import { BlogsDbType } from '../types/blog-types';
import { generateUniqueId } from '../../utils/generateUnigueId';
import { requestBlogsType } from '../types/transaction-types-blogs';

export const newModelBlog = (reqBody: requestBlogsType): BlogsDbType => {
  const { name, description, websiteUrl } = reqBody;
  return { id: generateUniqueId(), name, description, websiteUrl };
};
