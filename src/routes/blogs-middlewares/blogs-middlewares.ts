import { queryValidators } from '../../middlewairs/validate-middleawairs/query-validators/query-validators';
import { queryBaseSanitizers } from '../../middlewairs/query-sanitizers-middleware/query-base-sanitizers/query-base-sanitizers';
import { blogsController } from '../../controllers/blogs-controller/blogs-controller';
import { paramIdValidator } from '../../middlewairs/validate-middleawairs/params-validators/param-id-validator';
import { handlerErrorsValidator } from '../../middlewairs/validate-middleawairs/utils/handler-errors-validator';
import { authAdminMiddleware } from '../../middlewairs/auth-middlewares/auth-admin-middleware/auth-admin-middleware';
import { blogsInputValidator } from '../../middlewairs/validate-middleawairs/collections-validators/blogs-validators/blogs-input-validator';
import { postsInputValidator } from '../../middlewairs/validate-middleawairs/collections-validators/posts-validators/posts-input-validator';
import { queryBlogsSanitizers } from '../../middlewairs/query-sanitizers-middleware/query-blogs-sanitizers/query-blogs-sanitizers';
import { queryBlogsValidators } from '../../middlewairs/validate-middleawairs/query-validators/query-blogs-validators/query-blogs-validators';
import { queryPostsValidators } from '../../middlewairs/validate-middleawairs/query-validators/query-posts-validators/query-posts-validators';
import { queryPostsSanitizers } from '../../middlewairs/query-sanitizers-middleware/query-posts-sanitizers/query-posts-sanitizers';

export const blogsRoutersMiddlewares = {
  getBlogs: [...queryBlogsValidators, ...queryBlogsSanitizers, blogsController.getBlogs],
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
    ...queryPostsValidators,
    ...queryPostsSanitizers,
    blogsController.getPostsByBlogId,
  ],
  deleteBlog: [paramIdValidator, authAdminMiddleware, handlerErrorsValidator, blogsController.deleteBlog],
};
