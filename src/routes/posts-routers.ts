import { Router } from 'express';
import { postsRoutersMiddlewares } from './posts-middlewares/posts-middlewares';

export const postsRouters = Router();

postsRouters.get('/', ...postsRoutersMiddlewares.getPosts);
postsRouters.get('/:id', ...postsRoutersMiddlewares.getPostById);
postsRouters.post('/', ...postsRoutersMiddlewares.createPost);
postsRouters.put('/:id', ...postsRoutersMiddlewares.updatePost);
postsRouters.delete('/:id', ...postsRoutersMiddlewares.deletePost);
