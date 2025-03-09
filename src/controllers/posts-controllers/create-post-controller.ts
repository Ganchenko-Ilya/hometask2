import { Request, Response } from 'express';
import { postsRepository } from '../../repository/posts-repository/posts-repository';
import { requestPostsType } from '../../repository/posts-repository/types/transaction-types-posts';

export const createPostController = (req: Request<unknown, unknown, requestPostsType>, res: Response) => {
  const post = postsRepository.createPost(req.body);
  if (post) {
    res.status(200).send(post);
  } else {
    res.status(404).end();
  }
};
