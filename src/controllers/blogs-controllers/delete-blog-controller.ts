import { Request, Response } from 'express';
import { blogsRepository } from '../../repository/blogs-repository/blogs-repository';

export const deleteBlogController = (req: Request<{ id: string }>, res: Response) => {
  const completed = blogsRepository.deleteById(req.params.id);
  if (completed) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
};
