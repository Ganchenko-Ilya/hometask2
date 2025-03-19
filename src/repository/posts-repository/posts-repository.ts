import { PostDbType } from './types/post-types';
import { requestPostsType } from './types/transaction-types-posts';
import { newModelPost } from './utils/newModelPost';
import { blogsRepository } from '../blogs-repository/blogs-repository';
import { updatePostModel } from './utils/updatePostModel';
import { postsCollection } from '../../db/db';

export const postsRepository = {
  getPosts: async (): Promise<PostDbType[]> => {
    return postsCollection.find().toArray();
  },
  createPost: async (reqBody: requestPostsType): Promise<PostDbType | undefined> => {
    const blog = await blogsRepository.getBlogById(reqBody.blogId);
    if (blog) {
      const newPost: PostDbType = newModelPost(reqBody, blog.name);
      await postsCollection.insertOne(newPost);
      return { ...newPost };
    } else {
      return undefined;
    }
  },
  getPostById: async (id: string): Promise<PostDbType | undefined> => {
    const post = await postsCollection.findOne({ id });
    if (post) {
      return { ...post };
    } else {
      return undefined;
    }
  },
  updatePostById: async (id: string, reqBody: requestPostsType): Promise<boolean> => {
    const updateModel = updatePostModel(reqBody);

    const updateProcess = await postsCollection.updateOne({ id }, { $set: updateModel });
    const blog = await blogsRepository.getBlogById(reqBody.blogId);

    if (updateProcess.matchedCount && blog) {
      return true;
    } else {
      return false;
    }
  },
  deletePostById: async (id: string): Promise<boolean> => {
    const deleteProcess = await postsCollection.deleteOne({ id });
    if (deleteProcess.deletedCount) {
      return true;
    } else {
      return false;
    }
  },
  deletePostsByBlogId: async (blogId: string) => {
    await postsCollection.deleteMany({ blogId });
  },
  deletePosts: async () => {
    await postsCollection.drop();
  },
};
