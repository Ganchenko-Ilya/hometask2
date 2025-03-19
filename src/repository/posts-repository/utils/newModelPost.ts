import { requestPostsType } from '../types/transaction-types-posts';
import { generateUniqueId } from '../../utils/generateUnigueId';
import { createNewDateFormatISO } from '../../utils/createNewDateFormatISO';
import { PostDbType } from '../types/post-types';

export const newModelPost = (reqBody: requestPostsType, blogName: string): PostDbType => {
  const { blogId, content, shortDescription, title } = reqBody;
  return {
    blogId,
    content,
    shortDescription,
    title,
    id: generateUniqueId(),
    createdAt: createNewDateFormatISO(),
    blogName,
  };
};
