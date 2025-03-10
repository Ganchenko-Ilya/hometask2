import { websiteUrlReg } from './utils/websiteUrl-reg';
import { createInputDefaultValidator } from '../utils/create-input-default-validator';
import { handlerErrorsValidator } from '../utils/handlrer-errors-validator';

const nameBlogValidator = createInputDefaultValidator({ min: 3, max: 15 }, 'name');
const descriptionBlogValidator = createInputDefaultValidator({ min: 3, max: 500 }, 'description');
const websiteUrlBlogValidator = createInputDefaultValidator({ min: 3, max: 100 }, 'websiteUrl').custom(
  async (value) => {
    const isValid = websiteUrlReg.test(value);
    if (!isValid) {
      throw new Error('invalid websiteurl by url format');
    }
  },
);

export const blogsValidator = [
  nameBlogValidator,
  descriptionBlogValidator,
  websiteUrlBlogValidator,
  handlerErrorsValidator,
];
