import { BlogDbType } from '../../repository/blogs-repository/types/blog-types';
import { PostDbType } from '../../repository/posts-repository/types/post-types';

export type BlogsCollectionType = BlogDbType & { _id: string };
export type PostsCollectionType = PostDbType & { _id: string };
