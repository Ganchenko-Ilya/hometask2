import { Request, Response } from 'express';
import { blogsRepository } from '../../repository/blogs-repository/blogs-repository';

export const deleteBlogController = async (req: Request<{ id: string }>, res: Response) => {
  const completed = await blogsRepository.deleteBlogById(req.params.id);
  if (completed) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
};
