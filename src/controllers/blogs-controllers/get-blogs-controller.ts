import { Request, Response } from 'express';
import { blogsRepository } from '../../repository/blogs-repository/blogs-repository';

export const getBlogsController = (req: Request, res: Response) => {
  const blogs = blogsRepository.getBlogs();
  res.status(200).send(blogs);
};
