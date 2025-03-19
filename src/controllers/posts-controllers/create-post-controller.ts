import { Request, Response } from 'express';
import { postsRepository } from '../../repository/posts-repository/posts-repository';
import { requestPostsType } from '../../repository/posts-repository/types/transaction-types-posts';

export const createPostController = async (req: Request<unknown, unknown, requestPostsType>, res: Response) => {
  try {
    const post = await postsRepository.createPost(req.body);
    if (post) {
      res.status(201).send(post);
    } else {
      res.status(404).send('blogId not found');
    }
  } catch (e) {
    res.sendStatus(500);
  }
};
