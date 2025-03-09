import { Router } from 'express';
import { getBlogsController } from '../controllers/blogs-controllers/get-blogs-controller';
import { getBlogIdController } from '../controllers/blogs-controllers/get-blog-controller';
import { createBlogController } from '../controllers/blogs-controllers/create-blog-controller';
import { updateBlogController } from '../controllers/blogs-controllers/update-blog-controller';
import { deleteBlogController } from '../controllers/blogs-controllers/delete-blog-controller';

export const blogsRouters = Router();

blogsRouters.get('/', getBlogsController);
blogsRouters.get('/:id', getBlogIdController);
blogsRouters.post('/', createBlogController);
blogsRouters.put('/:id', updateBlogController);
blogsRouters.delete('/:id', deleteBlogController);
