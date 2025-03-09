import { Request, Response } from 'express';
import { blogsRepository } from '../../repository/blogs-repository/blogs-repository';
import { requestBlogsType } from '../../repository/blogs-repository/types/transaction-types-blogs';

export const createBlogController = (req: Request<unknown, unknown, requestBlogsType>, res: Response) => {
  const blog = blogsRepository.createBlog(req.body);
  res.status(200).send(blog);
};
