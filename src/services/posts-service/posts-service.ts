import { ObjectId } from 'mongodb';

import { postsRepository } from '../../repositories/posts-repository/posts-repository';
import { RequestPostType } from '../../types/posts-types/posts-type';
import { newModelPost } from '../../repositories/posts-repository/utils/newModelPost';
import { updatePostModel } from '../../repositories/posts-repository/utils/updatePostModel';

export const postsService = {
  getPosts: async () => {
    return postsRepository.getPosts();
  },
  getPostsById: async (id: ObjectId) => {
    return postsRepository.getPostById(id);
  },
  createPost: async (variablesForNewModel: RequestPostType & { blogName: string }) => {
    const newPost = newModelPost(variablesForNewModel);

    return postsRepository.createPost(newPost);
  },
  updatePostById: async (_id: ObjectId, reqBody: RequestPostType) => {
    const updateModel = updatePostModel(reqBody);

    return postsRepository.updatePostById(_id, updateModel);
  },
  deletePostById: async (_id: ObjectId) => {
    return postsRepository.deletePostById(_id);
  },
};
