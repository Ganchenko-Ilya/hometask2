import { Router } from 'express';
import { authValidators } from '../middlewairs/validate-middleawairs/collections-validators/auth-validators/auth-validators';
import { authController } from '../controllers/auth-controller/auth-controller';
import { handlerErrorsValidator } from '../middlewairs/validate-middleawairs/utils/handler-errors-validator';

export const authRouters = Router();

authRouters.post('/login', ...authValidators, handlerErrorsValidator, authController.authLogin);
