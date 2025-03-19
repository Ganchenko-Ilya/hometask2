import { BlogDbType } from './types/blog-types';

import { newModelBlog } from './utils/newModelBlog';
import { updateBlogModel } from './utils/updateBlogModel';
import { requestBlogsType } from './types/requests-types-blogs';
import { postsRepository } from '../posts-repository/posts-repository';
import { blogsCollection } from '../../db/db';
import { resDateWithoutMongoId } from '../utils/resDateWithoutMongoId';
import { BlogsCollectionType } from '../../db/type/collectionsType';

export const blogsRepository = {
  getBlogs: async (): Promise<BlogDbType[]> => {
    const blogs = await blogsCollection.find().toArray();
    const response = resDateWithoutMongoId(blogs) as BlogDbType[];
    return response;
  },
  createBlog: async (reqBody: requestBlogsType): Promise<BlogDbType> => {
    const newBlog = newModelBlog(reqBody) as BlogsCollectionType;

    await blogsCollection.insertOne(newBlog);

    const response = resDateWithoutMongoId(newBlog) as BlogDbType;

    return response;
  },
  getBlogById: async (id: string): Promise<BlogDbType | undefined> => {
    const blog = await blogsCollection.findOne({ id });

    if (blog) {
      const response = resDateWithoutMongoId(blog) as BlogDbType;
      return response;
    } else {
      return undefined;
    }
  },
  updateBlogById: async (id: string, reqBody: requestBlogsType): Promise<boolean> => {
    const updateModel = updateBlogModel(reqBody);
    const updateProcess = await blogsCollection.updateOne({ id }, { $set: updateModel });

    if (updateProcess.matchedCount) {
      return true;
    } else {
      return false;
    }
  },
  deleteBlogById: async (id: string): Promise<boolean> => {
    const deleteProcess = await blogsCollection.deleteOne({ id });
    if (deleteProcess.deletedCount) {
      await postsRepository.deletePostsByBlogId(id);
      return true;
    } else {
      return false;
    }
  },
  deleteBlogs: async () => {
    await blogsCollection.drop();
  },
};
