import { blogsRepository } from '../../repositories/blogs-repository/blogs-repository';
import { newModelBlog } from './utils/newModelBlog';
import { RequestBlogType } from '../../types/blogs-types/blogs-type';
import { ObjectId } from 'mongodb';
import { updateBlogModel } from './utils/updateBlogModel';

export const blogService = {
  getBlogs: async () => {
    return blogsRepository.getBlogs();
  },
  getBlogById: async (id: ObjectId) => {
    return blogsRepository.getBlogById(id);
  },
  createBlog: async (reqBody: RequestBlogType) => {
    const newBlog = newModelBlog(reqBody);

    return blogsRepository.createBlog(newBlog);
  },
  updateBlogById: async (id: ObjectId, reqBody: RequestBlogType) => {
    const updateModel = updateBlogModel(reqBody);

    return blogsRepository.updateBlogById(id, updateModel);
  },
  deleteBlogById: async (id: ObjectId) => {
    return blogsRepository.deleteBlogById(id);
  },
};
