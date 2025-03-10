import { PostDbType } from './types/post-types';
import { requestPostsType } from './types/transaction-types-posts';
import { newModelPost } from './utils/newModelPost';
import { generateUniqueId } from '../utils/generateUnigueId';
import { blogsRepository } from '../blogs-repository/blogs-repository';
import { updatePostModel } from './utils/updatePostModel';

let postsDb: PostDbType[] = [];

export const postsRepository = {
  getPosts: (): PostDbType[] => {
    return [...postsDb];
  },
  createPost: (reqBody: requestPostsType): PostDbType | undefined => {
    const blog = blogsRepository.getBlogById(reqBody.blogId);
    if (blog) {
      const newPost = { ...newModelPost(reqBody), id: generateUniqueId(), blogName: blog.name };
      postsDb.push(newPost);
      return { ...newPost };
    } else {
      return undefined;
    }
  },
  getPostById: (id: string): PostDbType | undefined => {
    const post = postsDb.find((el) => el.id === id);
    if (post) {
      return { ...post };
    } else {
      return undefined;
    }
  },
  updatePostById: (id: string, reqBody: requestPostsType): boolean => {
    const post = postsRepository.getPostById(id);
    if (post) {
      const model = updatePostModel(reqBody);
      postsDb = postsDb.map((el) => (el.id === id ? { ...el, ...model } : el));
      return true;
    } else {
      return false;
    }
  },
  deletePostById: (id: string): boolean => {
    const post = postsRepository.getPostById(id);
    if (post) {
      postsDb = postsDb.filter((el) => el.id !== id);
      return true;
    } else {
      return false;
    }
  },
  deletePostsByBlogId: (blogId: string) => {
    postsDb = postsDb.filter((el) => el.blogId !== blogId);
  },
  deletePosts: () => {
    postsDb = [];
  },
};
