import { Request, Response } from 'express';
import { postsRepository } from '../../repository/posts-repository/posts-repository';

export const deletePostController = (req: Request<{ id: string }>, res: Response) => {
  const completed = postsRepository.deletePostbyId(req.params.id);
  if (completed) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
};
