import { Request, Response } from 'express';
import { blogsRepository } from '../../repository/blogs-repository/blogs-repository';

export const getBlogIdController = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const blog = await blogsRepository.getBlogById(req.params.id);

    if (blog) {
      res.status(200).send(blog);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.sendStatus(500);
  }
};
