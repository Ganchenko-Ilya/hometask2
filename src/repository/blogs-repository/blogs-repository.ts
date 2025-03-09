import { BlogDbType } from './types/blog-types';

import { newModelBlog } from './utils/newModelBlog';
import { updateBlogModel } from './utils/updateBlogModel';
import { requestBlogsType } from './types/transaction-types-blogs';

let blogsDb: BlogDbType[] = [];

export const blogsRepository = {
  getBlogs: (): BlogDbType[] => {
    return [...blogsDb];
  },
  createBlog: (reqBody: requestBlogsType): BlogDbType => {
    const newBlog = newModelBlog(reqBody);
    blogsDb.push(newBlog);
    return { ...newBlog };
  },
  getBlogById: (id: string): BlogDbType | undefined => {
    const blog = blogsDb.find((el) => el.id === id);
    if (blog) {
      return { ...blog };
    } else {
      return undefined;
    }
  },
  updateBlogById: (id: string, reqBody: requestBlogsType): boolean => {
    const blog = blogsRepository.getBlogById(id);
    if (blog) {
      const updateModel = updateBlogModel(reqBody);
      blogsDb = blogsDb.map((el) => (el.id === id ? { ...updateModel, id: el.id } : el));
      return true;
    } else {
      return false;
    }
  },
  deleteById: (id: string): boolean => {
    const blog = blogsRepository.getBlogById(id);
    if (blog) {
      blogsDb = blogsDb.filter((el) => el.id !== id);
      return true;
    } else {
      return false;
    }
  },
  deleteBlogs: () => {
    blogsDb = [];
  },
};
