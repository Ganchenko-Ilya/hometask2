import { Router } from 'express';
import { usersController } from '../controllers/users-controllers/users-controller';
import { authAdminMiddleware } from '../middlewairs/auth-middlewares/auth-admin-middleware/auth-admin-middleware';
import { queryUsersSanitizers } from '../middlewairs/query-sanitizers-middleware/query-users-sanitizers/query-users-sanitizers';

export const usersRouters = Router();

usersRouters.get('/', authAdminMiddleware, ...queryUsersSanitizers, usersController.getUsers);
usersRouters.post('/', usersController.createUser);
