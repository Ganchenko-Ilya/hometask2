import { Request, Response } from 'express';
import { postsRepository } from '../../repository/posts-repository/posts-repository';
import { requestPostsType } from '../../repository/posts-repository/types/transaction-types-posts';

export const getPostController = async (req: Request<{ id: string }, unknown, requestPostsType>, res: Response) => {
  try {
    const post = await postsRepository.getPostById(req.params.id);
    if (post) {
      res.status(200).send(post);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.sendStatus(500);
  }
};
