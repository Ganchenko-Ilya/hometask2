import { postsCollection } from '../../db/db';
import { ObjectId } from 'mongodb';
import { PostsDbType, RequestPostType } from '../../types/posts-types/posts-type';

export const postsRepository = {
  getPosts: async (): Promise<PostsDbType[]> => {
    return postsCollection.find().toArray();
  },
  getPostById: async (_id: ObjectId): Promise<PostsDbType | undefined> => {
    const post = await postsCollection.findOne({ _id });
    if (post) {
      return post;
    } else {
      return undefined;
    }
  },
  createPost: async (newPost: PostsDbType) => {
    return postsCollection.insertOne(newPost);
  },

  updatePostById: async (_id: ObjectId, updateModel: RequestPostType): Promise<boolean> => {
    const updateProcess = await postsCollection.updateOne({ _id }, { $set: updateModel });

    if (updateProcess.matchedCount) {
      return true;
    } else {
      return false;
    }
  },
  deletePostById: async (_id: ObjectId): Promise<boolean> => {
    const deleteProcess = await postsCollection.deleteOne({ _id });
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
