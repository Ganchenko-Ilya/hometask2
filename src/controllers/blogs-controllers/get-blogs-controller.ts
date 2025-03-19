import { Request, Response } from 'express';
import { blogsRepository } from '../../repository/blogs-repository/blogs-repository';

export const getBlogsController = async (req: Request, res: Response) => {
  try {
    const blogs = await blogsRepository.getBlogs();
    res.status(200).send(blogs);
  } catch (e) {
    res.sendStatus(500);
  }
};
