import { Router } from 'express';
import { getPostsController } from '../controllers/posts-controllers/get-posts-controller';
import { getPostController } from '../controllers/posts-controllers/get-post-controller';
import { createPostController } from '../controllers/posts-controllers/create-post-controller';
import { updatePostController } from '../controllers/posts-controllers/update-post-controller';
import { deletePostController } from '../controllers/posts-controllers/delete-post-controller';

export const postsRouters = Router();

postsRouters.get('/', getPostsController);
postsRouters.get('/:id', getPostController);
postsRouters.post('/', createPostController);
postsRouters.put('/:id', updatePostController);
postsRouters.delete('/:id', deletePostController);
