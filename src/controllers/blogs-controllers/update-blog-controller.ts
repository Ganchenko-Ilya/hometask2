import { Request, Response } from 'express';
import { blogsRepository } from '../../repository/blogs-repository/blogs-repository';
import { requestBlogsType } from '../../repository/blogs-repository/types/requests-types-blogs';

export const updateBlogController = async (req: Request<{ id: string }, unknown, requestBlogsType>, res: Response) => {
  const completed = await blogsRepository.updateBlogById(req.params.id, req.body);
  if (completed) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
};
