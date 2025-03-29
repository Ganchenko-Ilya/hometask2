import { queryValidators } from '../../middlewairs/validate-middleawairs/query-validators/query-validators';
import { queryBaseSanitizers } from '../../middlewairs/query-sanitizers-middleware/query-base-sanitizers';
import { blogsController } from '../../controllers/blogs-controllers/blogs-controller';
import { paramIdValidator } from '../../middlewairs/validate-middleawairs/params-validators/param-id-validator';
import { handlerErrorsValidator } from '../../middlewairs/validate-middleawairs/utils/handler-errors-validator';
import { authAdminMiddleware } from '../../middlewairs/auth-middlewares/auth-admin-middleware/auth-admin-middleware';
import { blogsInputValidator } from '../../middlewairs/validate-middleawairs/collections-validators/blogs-validators/blogs-input-validator';
import { postsInputValidator } from '../../middlewairs/validate-middleawairs/collections-validators/posts-validators/posts-input-validator';

export const blogsRoutersMiddlewares = {
  getBlogs: [...queryValidators, ...queryBaseSanitizers(), blogsController.getBlogs],
  getBlogById: [paramIdValidator, handlerErrorsValidator, blogsController.getBlogById],
  createBlog: [authAdminMiddleware, ...blogsInputValidator, blogsController.createBlog],
  createPostByBlogId: [
    authAdminMiddleware,
    paramIdValidator,
    ...postsInputValidator,
    blogsController.createPostByBlogId,
  ],
  updateBlog: [paramIdValidator, authAdminMiddleware, ...blogsInputValidator, blogsController.updateBlog],
  getPostsByBlogId: [
    paramIdValidator,
    ...queryValidators,
    ...queryBaseSanitizers(true),
    blogsController.getPostsByBlogId,
  ],
  deleteBlog: [paramIdValidator, authAdminMiddleware, handlerErrorsValidator, blogsController.deleteBlog],
};
