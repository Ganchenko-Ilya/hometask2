import { Request, Response } from 'express';
import { postsRepository } from '../../repository/posts-repository/posts-repository';
import { requestPostsType } from '../../repository/posts-repository/types/transaction-types-posts';

export const updatePostController = async (req: Request<{ id: string }, unknown, requestPostsType>, res: Response) => {
  try {
    const completed = await postsRepository.updatePostById(req.params.id, req.body);
    if (completed) {
      res.sendStatus(204);
    } else {
      res.status(404).send('BlogId or postId not founds');
    }
  } catch (e) {
    res.sendStatus(500);
  }
};
