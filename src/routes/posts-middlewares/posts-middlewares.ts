import { queryValidators } from '../../middlewairs/validate-middleawairs/query-validators/query-validators';
import { queryBaseSanitizers } from '../../middlewairs/query-sanitizers-middleware/query-base-sanitizers';
import { paramIdValidator } from '../../middlewairs/validate-middleawairs/params-validators/param-id-validator';
import { handlerErrorsValidator } from '../../middlewairs/validate-middleawairs/utils/handler-errors-validator';
import { authAdminMiddleware } from '../../middlewairs/auth-middlewares/auth-admin-middleware/auth-admin-middleware';
import { postsController } from '../../controllers/posts-controllers/posts-controller';
import { postsInputValidator } from '../../middlewairs/validate-middleawairs/collections-validators/posts-validators/posts-input-validator';

export const postsRoutersMiddlewares = {
  getPosts: [...queryValidators, ...queryBaseSanitizers, postsController.getPosts],
  getPostById: [paramIdValidator, handlerErrorsValidator, postsController.getPostById],
  createPost: [authAdminMiddleware, ...postsInputValidator, postsController.createPost],
  updatePost: [paramIdValidator, authAdminMiddleware, ...postsInputValidator, postsController.updatePost],
  deletePost: [paramIdValidator, authAdminMiddleware, handlerErrorsValidator, postsController.deletePost],
};
