import { createInputDefaultValidator } from '../../utils/create-input-default-validator';
import { handlerErrorsValidator } from '../../utils/handler-errors-validator';

const titlePostValidator = createInputDefaultValidator({ min: 3, max: 30 }, 'title');
const shortDescriptionPostValidator = createInputDefaultValidator({ min: 3, max: 100 }, 'shortDescription');
const contentPostValidator = createInputDefaultValidator({ min: 3, max: 1000 }, 'content');

export const postsInputValidator = [
  titlePostValidator,
  shortDescriptionPostValidator,
  contentPostValidator,
  handlerErrorsValidator,
];
