import { requestPostsType } from '../types/transaction-types-posts';

export const newModelPost = (reqBody: requestPostsType) => {
  const { blogId, content, shortDescription, title } = reqBody;
  return { blogId, content, shortDescription, title };
};
