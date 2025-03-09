import { Request, Response } from 'express';
import { postsRepository } from '../../repository/posts-repository/posts-repository';
import { requestPostsType } from '../../repository/posts-repository/types/transaction-types-posts';

export const getPostController = (req: Request<{ id: string }, unknown, requestPostsType>, res: Response) => {
  const post = postsRepository.getPostById(req.params.id);
  if (post) {
    res.status(200).send(post);
  } else {
    res.status(404).end();
  }
};
