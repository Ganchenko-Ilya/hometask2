import { Request, Response } from 'express';
import { postsRepository } from '../../repository/posts-repository/posts-repository';
import { requestPostsType } from '../../repository/posts-repository/types/transaction-types-posts';

export const updatePostController = (req: Request<{ id: string }, unknown, requestPostsType>, res: Response) => {
  const completed = postsRepository.updatePostById(req.params.id, req.body);
  if (completed) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
};
