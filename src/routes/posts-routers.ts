import { Router } from 'express';
import { getPostsController } from '../controllers/posts-controllers/get-posts-controller';
import { getPostController } from '../controllers/posts-controllers/get-post-controller';
import { createPostController } from '../controllers/posts-controllers/create-post-controller';
import { updatePostController } from '../controllers/posts-controllers/update-post-controller';
import { deletePostController } from '../controllers/posts-controllers/delete-post-controller';
import { authAdminMiddleware } from '../middlewairs/auth-admin-middleware';
import { postsValidator } from '../validators/posts-validators/posts-validator';

export const postsRouters = Router();

postsRouters.get('/', getPostsController);
postsRouters.get('/:id', getPostController);
postsRouters.post('/', authAdminMiddleware, ...postsValidator, createPostController);
postsRouters.put('/:id', authAdminMiddleware, ...postsValidator, updatePostController);
postsRouters.delete('/:id', authAdminMiddleware, deletePostController);
