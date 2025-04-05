import { body } from 'express-validator';

export const passwordValidator = body('password').trim().isLength({ min: 6, max: 20 }).isString();
