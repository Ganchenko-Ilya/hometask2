import { Request, Response } from 'express';
import { postsRepository } from '../../repository/posts-repository/posts-repository';

export const getPostsController = async (req: Request, res: Response) => {
  try {
    const posts = await postsRepository.getPosts();
    res.status(200).send(posts);
  } catch (e) {
    res.sendStatus(500);
  }
};
