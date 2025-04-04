import { createNewDateFormatISO } from '../../utils/createNewDateFormatISO';
import { BlogsDbType, RequestBlogType } from '../../../types/blogs-types/blogs-type';
import { ObjectId } from 'mongodb';

export const newModelBlog = (reqBody: RequestBlogType): BlogsDbType => {
  const { name, description, websiteUrl } = reqBody;
  return {
    name,
    description,
    websiteUrl,
    createdAt: createNewDateFormatISO(),
    isMembership: false,
    _id: new ObjectId(),
  };
};
