import { blogsRepository } from '../../repositories/blogs-repository/blogs-repository';
import { postsRepository } from '../../repositories/posts-repository/posts-repository';
import { usersRepository } from '../../repositories/users-repository/users-repository';

export const deleteAll = async () => {
  try {
    await blogsRepository.deleteBlogs();
    await postsRepository.deletePosts();
    await usersRepository.deleteUsers();
  } catch (e: unknown) {
    console.log('No deleted,500');
  }
};
