import { generateUniqueId } from '../../utils/generateUnigueId';
import { requestBlogsType } from '../types/transaction-types-blogs';
import { BlogDbType } from '../types/blog-types';

export const newModelBlog = (reqBody: requestBlogsType): BlogDbType => {
  const { name, description, websiteUrl } = reqBody;
  return { id: generateUniqueId(), name, description, websiteUrl };
};
