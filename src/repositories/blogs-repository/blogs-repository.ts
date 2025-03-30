import { blogsCollection } from '../../db/db';

import { BlogsDbType, NewModelBlogType, RequestBlogType } from '../../types/blogs-types/blogs-type';
import { ObjectId } from 'mongodb';

export const blogsRepository = {
  getBlogs: async (): Promise<BlogsDbType[]> => {
    return blogsCollection.find().toArray();
  },
  createBlog: async (newBlog: BlogsDbType) => {
    return blogsCollection.insertOne(newBlog);
  },
  getBlogById: async (_id: ObjectId): Promise<BlogsDbType | undefined> => {
    const blog = await blogsCollection.findOne({ _id });

    if (blog) {
      return blog;
    } else {
      return undefined;
    }
  },
  updateBlogById: async (_id: ObjectId, updateModel: RequestBlogType): Promise<boolean> => {
    const updateProcess = await blogsCollection.updateOne({ _id }, { $set: updateModel });

    if (updateProcess.matchedCount) {
      return true;
    } else {
      return false;
    }
  },
  deleteBlogById: async (_id: ObjectId): Promise<boolean> => {
    const deleteProcess = await blogsCollection.deleteOne({ _id });
    if (deleteProcess.deletedCount) {
      return true;
    } else {
      return false;
    }
  },
  deleteBlogs: async () => {
    await blogsCollection.drop();
  },
};
