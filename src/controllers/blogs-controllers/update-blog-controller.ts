import { Request, Response } from 'express';
import { blogsRepository } from '../../repository/blogs-repository/blogs-repository';
import { requestBlogsType } from '../../repository/blogs-repository/types/transaction-types-blogs';

export const updateBlogController = (req: Request<{ id: string }, unknown, requestBlogsType>, res: Response) => {
  const completed = blogsRepository.updateBlogById(req.params.id, req.body);
  if (completed) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
};
