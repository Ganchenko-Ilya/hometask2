import { paramIdValidator } from '../../middlewairs/validate-middleawairs/params-validators/param-id-validator';
import { handlerErrorsValidator } from '../../middlewairs/validate-middleawairs/utils/handler-errors-validator';
import { authAdminMiddleware } from '../../middlewairs/auth-middlewares/auth-admin-middleware/auth-admin-middleware';
import { postsController } from '../../controllers/posts-controller/posts-controller';
import { postsInputValidator } from '../../middlewairs/validate-middleawairs/collections-validators/posts-validators/posts-input-validator';
import { queryPostsValidators } from '../../middlewairs/validate-middleawairs/query-validators/query-posts-validators/query-posts-validators';
import { queryPostsSanitizers } from '../../middlewairs/query-sanitizers-middleware/query-posts-sanitizers/query-posts-sanitizers';

export const postsRoutersMiddlewares = {
  getPosts: [...queryPostsValidators, ...queryPostsSanitizers, postsController.getPosts],
  getPostById: [paramIdValidator, handlerErrorsValidator, postsController.getPostById],
  createPost: [authAdminMiddleware, ...postsInputValidator, postsController.createPost],
  updatePost: [paramIdValidator, authAdminMiddleware, ...postsInputValidator, postsController.updatePost],
  deletePost: [paramIdValidator, authAdminMiddleware, handlerErrorsValidator, postsController.deletePost],
};
