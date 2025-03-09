import { Request, Response } from 'express';
import { blogsRepository } from '../../repository/blogs-repository/blogs-repository';

export const getBlogIdController = (req: Request<{ id: string }>, res: Response) => {
  const blog = blogsRepository.getBlogById(req.params.id);
  if (blog) {
    res.status(200).send(blog);
  } else {
    res.status(404).end();
  }
};
