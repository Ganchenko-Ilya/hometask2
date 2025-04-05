import { Router } from 'express';
import { authAdminMiddleware } from '../middlewairs/auth-middlewares/auth-admin-middleware/auth-admin-middleware';
import { usersValidators } from '../middlewairs/validate-middleawairs/collections-validators/users-validators/users-input-validators';
import { queryUsersValidator } from '../middlewairs/validate-middleawairs/query-validators/query-users-validators/query-users-validators';
import { queryUsersSanitizers } from '../middlewairs/query-sanitizers-middleware/query-users-sanitizers/query-users-sanitizers';
import { usersController } from '../controllers/users-controller/users-controller';
import { paramIdValidator } from '../middlewairs/validate-middleawairs/params-validators/param-id-validator';
import { handlerErrorsValidator } from '../middlewairs/validate-middleawairs/utils/handler-errors-validator';

export const usersRouters = Router();

usersRouters.get('/', authAdminMiddleware, ...queryUsersValidator, ...queryUsersSanitizers, usersController.getUsers);
usersRouters.post('/', authAdminMiddleware, ...usersValidators, usersController.createUser);
usersRouters.delete(
  '/:id',
  authAdminMiddleware,
  paramIdValidator,
  handlerErrorsValidator,
  usersController.deleteUserById,
);
