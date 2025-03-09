import { Request, Response } from 'express';
import { postsRepository } from '../../repository/posts-repository/posts-repository';

export const getPostsController = (req: Request, res: Response) => {
  const posts = postsRepository.getPosts();
  res.status(200).send(posts);
};
