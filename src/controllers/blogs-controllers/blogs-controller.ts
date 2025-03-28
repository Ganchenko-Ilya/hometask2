import { QueryParamsWithFormattedSorts } from '../../types/general-types/general-query-validator-types';
import { Request, Response } from 'express';
import { queryRepository } from '../../queryRepositories/query-repository';
import { BlogsDbType, RequestBlogType } from '../../types/blogs-types/blogs-type';
import { blogService } from '../../services/blog-service/blog-service';
import { ObjectId } from 'mongodb';
import { variablesForGetDataSlicesFunc } from '../utils/getVariablesForGetDataSlicesFunc/variablesForGetDataSlicesFunc';
import { postsRepository } from '../../repositories/posts-repository/posts-repository';
import { PostsDbType, RequestPostByBlogIdTyped } from '../../types/posts-types/posts-type';
import { postsService } from '../../services/posts-service/posts-service';

export const blogsController = {
  getBlogs: async (req: Request<unknown, unknown, unknown, QueryParamsWithFormattedSorts>, res: Response) => {
    try {
      const { searchNameTerm } = req.query;
      const totalCount = await queryRepository.getTotalCount('blogs', 'name', searchNameTerm);

      const variables = variablesForGetDataSlicesFunc(req.query, totalCount);

      const blogs = await queryRepository.getCollection<BlogsDbType>('blogs', 'name', variables.variablesForGetData);

      const blogsWithId = queryRepository.mapToResponseWithId(blogs);

      const blogsWithPagination = queryRepository.mapToResponseWithPagination(
        blogsWithId,
        variables.variablesForPagination,
      );

      if (blogsWithPagination.items.length || !searchNameTerm) {
        res.status(200).send(blogsWithPagination);
      } else {
        res.sendStatus(404);
      }
    } catch (e) {
      res.sendStatus(500);
    }
  },
  getBlogById: async (req: Request<{ id: string }>, res: Response) => {
    try {
      const _id = new ObjectId(req.params.id);

      const blog = await queryRepository.getCollectionItemById<BlogsDbType>(_id, 'blogs');
      if (blog) {
        const blogWithId = queryRepository.mapToResponseWithId(blog);

        res.status(200).send(...blogWithId);
      } else {
        res.sendStatus(404);
      }
    } catch (e) {
      res.sendStatus(500);
    }
  },
  getPostsByBlogId: async (
    req: Request<{ id: string }, unknown, unknown, QueryParamsWithFormattedSorts>,
    res: Response,
  ) => {
    try {
      const totalCount = await queryRepository.getTotalCount('posts', 'title', req.query.searchNameTerm, {
        blogId: req.params.id,
      });
      const variables = variablesForGetDataSlicesFunc(req.query, totalCount);
      const posts = await queryRepository.getCollection<PostsDbType>('posts', 'title', variables.variablesForGetData, {
        blogId: req.params.id,
      });
      const postsWithId = queryRepository.mapToResponseWithId(posts);
      const postsWithPagination = queryRepository.mapToResponseWithPagination(
        postsWithId,
        variables.variablesForPagination,
      );
      if (postsWithPagination.items.length || !req.query.searchNameTerm) {
        res.status(200).send(postsWithPagination);
      } else {
        res.status(404);
      }
    } catch (e: unknown) {
      res.sendStatus(500);
    }
  },
  createBlog: async (req: Request<unknown, unknown, RequestBlogType>, res: Response) => {
    try {
      const insertResult = await blogService.createBlog(req.body);
      const response = await queryRepository.getCollectionItemById(insertResult.insertedId, 'blogs');

      if (response) {
        const responseWithId = queryRepository.mapToResponseWithId(response);
        res.status(201).send(...responseWithId);
      } else {
        res.sendStatus(404);
      }
    } catch (e) {
      res.status(500).send(e);
    }
  },
  createPostByBlogId: async (req: Request<{ id: string }, unknown, RequestPostByBlogIdTyped>, res: Response) => {
    try {
      const blogId = new ObjectId(req.params.id);
      const blog = await queryRepository.getCollectionItemById<BlogsDbType>(blogId, 'blogs');
      if (blog) {
        const variablesForNewPost = { ...req.body, blogId: req.params.id, blogName: blog.name };
        const insertResult = await postsService.createPost(variablesForNewPost);
        const inserObjectId = insertResult.insertedId as unknown as ObjectId;
        const response = await queryRepository.getCollectionItemById<PostsDbType>(inserObjectId, 'posts');
        if (response) {
          const responseWithId = queryRepository.mapToResponseWithId(response);
          res.status(201).send(...responseWithId);
        } else {
          res.status(404).send('blogId is not found');
        }
      } else {
        res.status(404).send('blogId is not found');
      }
    } catch (e) {
      res.status(500).send(e);
    }
  },
  updateBlog: async (req: Request<{ id: string }, unknown, RequestBlogType>, res: Response) => {
    try {
      const _id = new ObjectId(req.params.id);
      const completed = await blogService.updateBlogById(_id, req.body);
      if (completed) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    } catch (e: unknown) {
      res.sendStatus(500);
    }
  },
  deleteBlog: async (req: Request<{ id: string }>, res: Response) => {
    try {
      const _id = new ObjectId(req.params.id);
      const completed = await blogService.deleteBlogById(_id);
      if (completed) {
        await postsRepository.deletePostsByBlogId(req.params.id);
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    } catch (e: unknown) {
      res.sendStatus(500);
    }
  },
};
