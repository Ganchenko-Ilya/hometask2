import {
  QueryParamsBlogsWithFormattedSorts,
  QueryParamsPostsWithFormattedSorts,
  SearchFilters,
  SearchItems,
} from '../../types/general-types/general-query-validator-types';
import { Request, Response } from 'express';
import { queryRepository } from '../../queryRepository/query-repository';
import { BlogsDbType, RequestBlogType } from '../../types/blogs-types/blogs-type';
import { blogService } from '../../services/blog-service/blog-service';
import { ObjectId } from 'mongodb';
import { variablesForGetDataSlicesFunc } from '../utils/getVariablesForGetDataSlicesFunc/variablesForGetDataSlicesFunc';
import { postsRepository } from '../../repositories/posts-repository/posts-repository';
import { PostsDbType, RequestPostByBlogIdTyped } from '../../types/posts-types/posts-type';
import { postsService } from '../../services/posts-service/posts-service';
import { createSearchFilters } from '../utils/getVariablesForGetDataSlicesFunc/halpers/createSearchFilters';

export const blogsController = {
  getBlogs: async (req: Request<unknown, unknown, unknown, QueryParamsBlogsWithFormattedSorts>, res: Response) => {
    try {
      const { searchNameTerm, formattedSorts, pageNumber, pageSize } = req.query;

      const searchItems = [{ searchBy: 'name', searchTerm: searchNameTerm }];
      const searchFilters = createSearchFilters(searchItems);

      const totalCount = await queryRepository.getTotalCount('blogs', searchFilters);

      const variables = variablesForGetDataSlicesFunc({
        formattedSorts,
        pageNumber,
        pageSize,
        searchFilters,
        totalCount,
      });

      const blogs = await queryRepository.getCollection<BlogsDbType>('blogs', variables.variablesForGetData);
      const blogsWithId = queryRepository.mapToResponseWithId(blogs);
      const blogsWithPagination = queryRepository.mapToResponseWithPagination(
        blogsWithId,
        variables.variablesForPagination,
      );

      res.status(200).send(blogsWithPagination);
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
    req: Request<{ id: string }, unknown, unknown, QueryParamsPostsWithFormattedSorts>,
    res: Response,
  ) => {
    try {
      const { formattedSorts, searchTitleTerm, pageNumber, pageSize } = req.query;

      const _id = new ObjectId(req.params.id);

      const blog = await queryRepository.getCollectionItemById<BlogsDbType>(_id, 'blogs');

      if (blog) {
        const searchItems: SearchItems[] = [{ searchBy: 'title', searchTerm: searchTitleTerm }];
        const searchFilters = createSearchFilters(searchItems);

        const totalCount = await queryRepository.getTotalCount('posts', searchFilters, {
          blogId: req.params.id,
        });

        const variables = variablesForGetDataSlicesFunc({
          formattedSorts,
          pageNumber,
          pageSize,
          searchFilters,
          totalCount,
        });

        const posts = await queryRepository.getCollection<PostsDbType>('posts', variables.variablesForGetData, {
          blogId: req.params.id,
        });
        const postsWithId = queryRepository.mapToResponseWithId(posts);
        const postsWithPagination = queryRepository.mapToResponseWithPagination(
          postsWithId,
          variables.variablesForPagination,
        );

        if (postsWithPagination.items.length || !req.query.searchTitleTerm) {
          res.status(200).send(postsWithPagination);
        } else {
          res.sendStatus(404);
        }
      } else {
        res.sendStatus(404);
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
        const inserObjectId = insertResult.insertedId;
        const response = await queryRepository.getCollectionItemById<PostsDbType>(inserObjectId, 'posts');
        if (response) {
          const responseWithId = queryRepository.mapToResponseWithId(response);
          res.status(201).send(...responseWithId);
        } else {
          res.sendStatus(404);
        }
      } else {
        res.sendStatus(404);
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
