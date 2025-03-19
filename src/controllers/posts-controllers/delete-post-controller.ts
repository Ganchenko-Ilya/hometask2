import { Request, Response } from 'express';
import { postsRepository } from '../../repository/posts-repository/posts-repository';

export const deletePostController = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const completed = await postsRepository.deletePostById(req.params.id);
    if (completed) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.sendStatus(500);
  }
};
