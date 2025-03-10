import { Router } from 'express';
import { getBlogsController } from '../controllers/blogs-controllers/get-blogs-controller';
import { getBlogIdController } from '../controllers/blogs-controllers/get-blog-controller';
import { createBlogController } from '../controllers/blogs-controllers/create-blog-controller';
import { updateBlogController } from '../controllers/blogs-controllers/update-blog-controller';
import { deleteBlogController } from '../controllers/blogs-controllers/delete-blog-controller';
import { authAdminMiddleware } from '../middlewairs/auth-admin-middleware';
import { blogsValidator } from '../validators/blogs-validators/blogs-validator';

export const blogsRouters = Router();

blogsRouters.get('/', getBlogsController);
blogsRouters.get('/:id', getBlogIdController);
blogsRouters.post('/', authAdminMiddleware, ...blogsValidator, createBlogController);
blogsRouters.put('/:id', authAdminMiddleware, ...blogsValidator, updateBlogController);
blogsRouters.delete('/:id', authAdminMiddleware, deleteBlogController);
