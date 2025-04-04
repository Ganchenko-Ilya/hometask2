import { createNewDateFormatISO } from '../../utils/createNewDateFormatISO';
import { PostsDbType, RequestPostType } from '../../../types/posts-types/posts-type';
import { ObjectId } from 'mongodb';

export const newModelPost = (reqBody: RequestPostType & { blogName: string }): PostsDbType => {
  const { blogId, content, shortDescription, title, blogName } = reqBody;
  return {
    blogId,
    content,
    shortDescription,
    title,
    createdAt: createNewDateFormatISO(),
    blogName,
    _id: new ObjectId(),
  };
};
