import { Router } from 'express';
import { blogsRoutersMiddlewares } from './blogs-middlewares/blogs-middlewares';

export const blogsRouters = Router();

blogsRouters.get('/', ...blogsRoutersMiddlewares.getBlogs);
blogsRouters.get('/:id', ...blogsRoutersMiddlewares.getBlogById);
blogsRouters.post('/', ...blogsRoutersMiddlewares.createBlog);
blogsRouters.put('/:id', ...blogsRoutersMiddlewares.updateBlog);
blogsRouters.get('/:id/posts', ...blogsRoutersMiddlewares.getPostsByBlogId);
blogsRouters.post('/:id/posts', ...blogsRoutersMiddlewares.createPostByBlogId);
blogsRouters.delete('/:id', ...blogsRoutersMiddlewares.deleteBlog);
