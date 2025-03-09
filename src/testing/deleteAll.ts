import { blogsRepository } from '../repository/blogs-repository/blogs-repository';
import { postsRepository } from '../repository/posts-repository/posts-repository';

export const deleteAll = () => {
  blogsRepository.deleteBlogs();
  postsRepository.deletePosts();
};
