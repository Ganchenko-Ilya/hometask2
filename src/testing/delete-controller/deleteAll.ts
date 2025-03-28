import { blogsRepository } from '../../repositories/blogs-repository/blogs-repository';
import { postsRepository } from '../../repositories/posts-repository/posts-repository';

export const deleteAll = () => {
  blogsRepository.deleteBlogs();
  postsRepository.deletePosts();
};
