import { generateUniqueId } from '../../utils/generateUnigueId';
import { requestBlogsType } from '../types/requests-types-blogs';
import { BlogDbType } from '../types/blog-types';
import { createNewDateFormatISO } from '../../utils/createNewDateFormatISO';

export const newModelBlog = (reqBody: requestBlogsType): BlogDbType => {
  const { name, description, websiteUrl } = reqBody;
  return {
    id: generateUniqueId(),
    name,
    description,
    websiteUrl,
    createdAt: createNewDateFormatISO(),
    isMembership: false,
  };
};
