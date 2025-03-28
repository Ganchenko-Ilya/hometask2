import { RequestPostType } from '../../../types/posts-types/posts-type';

export const updatePostModel = (reqBody: RequestPostType) => {
  const { blogId, shortDescription, content, title } = reqBody;
  return { blogId, shortDescription, content, title };
};
