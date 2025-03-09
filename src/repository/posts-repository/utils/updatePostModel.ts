import { requestPostsType } from '../types/transaction-types-posts';

export const updatePostModel = (reqBody: requestPostsType) => {
  const { blogId, shortDescription, content, title } = reqBody;
  return { blogId, shortDescription, content, title };
};
