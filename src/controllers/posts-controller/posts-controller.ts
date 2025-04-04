import {
  QueryParamsPostsWithFormattedSorts,
  SearchItems,
} from '../../types/general-types/general-query-validator-types';
import { Request, Response } from 'express';
import { queryRepository } from '../../queryRepository/query-repository';
import { ObjectId } from 'mongodb';
import { variablesForGetDataSlicesFunc } from '../utils/getVariablesForGetDataSlicesFunc/variablesForGetDataSlicesFunc';
import { PostsDbType, RequestPostType } from '../../types/posts-types/posts-type';
import { postsService } from '../../services/posts-service/posts-service';
import { BlogsDbType } from '../../types/blogs-types/blogs-type';
import { createSearchFilters } from '../utils/getVariablesForGetDataSlicesFunc/halpers/createSearchFilters';

export const postsController = {
  getPosts: async (req: Request<unknown, unknown, unknown, QueryParamsPostsWithFormattedSorts>, res: Response) => {
    try {
      const { searchTitleTerm, pageSize, pageNumber, formattedSorts } = req.query;

      const searchItems: SearchItems[] = [{ searchBy: 'title', searchTerm: searchTitleTerm }];
      const searchFilters = createSearchFilters(searchItems);
      const totalCount = await queryRepository.getTotalCount('posts', searchFilters);

      const variables = variablesForGetDataSlicesFunc({
        searchFilters,
        pageSize,
        pageNumber,
        formattedSorts,
        totalCount,
      });

      const posts = await queryRepository.getCollection<PostsDbType>('posts', variables.variablesForGetData);

      const postsWithId = queryRepository.mapToResponseWithId(posts);

      const postsWithPagination = queryRepository.mapToResponseWithPagination(
        postsWithId,
        variables.variablesForPagination,
      );

      res.status(200).send(postsWithPagination);
    } catch (e) {
      res.sendStatus(500);
    }
  },
  getPostById: async (req: Request<{ id: string }>, res: Response) => {
    try {
      const _id = new ObjectId(req.params.id);

      const post = await queryRepository.getCollectionItemById(_id, 'posts');
      if (post) {
        const postWithId = queryRepository.mapToResponseWithId(post);

        res.status(200).send(...postWithId);
      } else {
        res.sendStatus(404);
      }
    } catch (e) {
      res.sendStatus(500);
    }
  },
  createPost: async (req: Request<unknown, unknown, RequestPostType>, res: Response) => {
    try {
      const blogId = new ObjectId(req.body.blogId);
      const blog = await queryRepository.getCollectionItemById<BlogsDbType>(blogId, 'blogs');
      if (blog) {
        const variablesForNewPost = { ...req.body, blogName: blog.name };
        const insertResult = await postsService.createPost(variablesForNewPost);

        const response = await queryRepository.getCollectionItemById(insertResult.insertedId, 'posts');
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
  updatePost: async (req: Request<{ id: string }, unknown, RequestPostType>, res: Response) => {
    try {
      const _id = new ObjectId(req.params.id);
      const blog = await queryRepository.getCollectionItemById<BlogsDbType>(new ObjectId(req.body.blogId), 'blogs');
      if (blog) {
        const completed = await postsService.updatePostById(_id, req.body);
        if (completed) {
          res.sendStatus(204);
        } else {
          res.sendStatus(404);
        }
      } else {
        res.status(404).send('blogId is not founded');
      }
    } catch (e: unknown) {
      res.sendStatus(500);
    }
  },
  deletePost: async (req: Request<{ id: string }>, res: Response) => {
    try {
      const _id = new ObjectId(req.params.id);
      const completed = await postsService.deletePostById(_id);
      if (completed) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    } catch (e: unknown) {
      res.sendStatus(500);
    }
  },
};
