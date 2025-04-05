import { body } from 'express-validator';
import { loginReg } from '../constants/login-reg';
import { emailReg } from '../constants/email-reg';
import { handlerErrorsValidator } from '../../utils/handler-errors-validator';
import { passwordValidator } from '../utils/validators/passwordValidator';

export const loginValidator = body('login')
  .trim()
  .isLength({ min: 3, max: 10 })
  .isString()
  .custom((value) => loginReg.test(value))
  .withMessage('login shout be is regular /^[a-zA-Z0-9_-]*$/');

export const emailValidator = body('email')
  .trim()
  .isString()
  .custom((value) => emailReg.test(value))
  .withMessage('email shout be is regular /^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/');

export const usersValidators = [loginValidator, emailValidator, passwordValidator, handlerErrorsValidator];
