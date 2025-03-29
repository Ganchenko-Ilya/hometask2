import { body } from 'express-validator';

export const createInputDefaultValidator = (length: { min: number; max: number }, fieldName: string) => {
  console.log(1);
  return body(fieldName)
    .trim()
    .isString()
    .withMessage(`${fieldName} shout be type string`)
    .isLength({ min: length.min, max: length.max })
    .withMessage(`${fieldName} shout be from ${length.min} to ${length.max} symbols`);
};
