import { Request, Response } from 'express';
import { blogsRepository } from '../../repository/blogs-repository/blogs-repository';
import { requestBlogsType } from '../../repository/blogs-repository/types/requests-types-blogs';

export const createBlogController = async (req: Request<unknown, unknown, requestBlogsType>, res: Response) => {
  try {
    const blog = await blogsRepository.createBlog(req.body);

    res.status(201).send(blog);
  } catch (e) {
    res.status(500).send(e);
  }
};
