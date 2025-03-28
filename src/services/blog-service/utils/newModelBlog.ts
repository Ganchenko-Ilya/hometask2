import { createNewDateFormatISO } from '../../utils/createNewDateFormatISO';
import { NewModelBlogType, RequestBlogType } from '../../../types/blogs-types/blogs-type';
import { ObjectId } from 'mongodb';

export const newModelBlog = (reqBody: RequestBlogType): NewModelBlogType => {
  const { name, description, websiteUrl } = reqBody;
  return {
    name,
    description,
    websiteUrl,
    createdAt: createNewDateFormatISO(),
    isMembership: false,
  };
};
