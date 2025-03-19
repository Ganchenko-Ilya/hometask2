import { PostDbType } from './types/post-types';
import { requestPostsType } from './types/transaction-types-posts';
import { newModelPost } from './utils/newModelPost';
import { blogsRepository } from '../blogs-repository/blogs-repository';
import { updatePostModel } from './utils/updatePostModel';
import { postsCollection } from '../../db/db';
import { resDateWithoutMongoId } from '../utils/resDateWithoutMongoId';
import { PostsCollectionType } from '../../db/type/collectionsType';

export const postsRepository = {
  getPosts: async (): Promise<PostDbType[]> => {
    const posts = await postsCollection.find().toArray();
    const response = resDateWithoutMongoId(posts) as PostDbType[];
    return response;
  },
  createPost: async (reqBody: requestPostsType): Promise<PostDbType | undefined> => {
    const blog = await blogsRepository.getBlogById(reqBody.blogId);
    if (blog) {
      const newPost = newModelPost(reqBody, blog.name) as PostsCollectionType;

      await postsCollection.insertOne(newPost);

      const response = resDateWithoutMongoId(newPost) as PostDbType;

      return response;
    } else {
      return undefined;
    }
  },
  getPostById: async (id: string): Promise<PostDbType | undefined> => {
    const post = await postsCollection.findOne({ id });
    if (post) {
      const response = resDateWithoutMongoId(post) as PostDbType;
      return response;
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
