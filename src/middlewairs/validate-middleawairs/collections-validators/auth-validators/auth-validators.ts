import { body } from 'express-validator';
import { loginReg } from '../constants/login-reg';
import { emailReg } from '../constants/email-reg';
import { passwordValidator } from '../utils/validators/passwordValidator';

export const loginOrEmailValidator = body('loginOrEmail')
  .isString()
  .custom((value) => {
    if (loginReg.test(value)) {
      if (value.length > 2 && value.length < 11) {
        return true;
      } else {
        return false;
      }
    } else if (emailReg.test(value)) {
      return true;
    } else {
      return false;
    }
  });

export const authValidators = [loginOrEmailValidator, passwordValidator];
