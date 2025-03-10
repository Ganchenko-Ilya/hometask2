import { body } from 'express-validator';
import { createInputDefaultValidator } from '../utils/create-input-default-validator';
import { blogsRepository } from '../../repository/blogs-repository/blogs-repository';
import { handlerErrorsValidator } from '../utils/handlrer-errors-validator';

const titlePostValidator = createInputDefaultValidator({ min: 3, max: 30 }, 'title');
const shortDescriptionPostValidator = createInputDefaultValidator({ min: 3, max: 100 }, 'shortDescription');
const contentPostValidator = createInputDefaultValidator({ min: 3, max: 1000 }, 'content');
const blogIdPostValidator = body('blogId').custom(async (blogId) => {
  const blog = blogsRepository.getBlogById(blogId);
  if (!blog) {
    throw new Error('blogId not founded');
  }
});

export const postsValidator = [
  blogIdPostValidator,
  titlePostValidator,
  shortDescriptionPostValidator,
  contentPostValidator,
  handlerErrorsValidator,
];
