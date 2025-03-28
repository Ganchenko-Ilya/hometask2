import { QueryParamsWithFormattedSorts } from '../../types/general-types/general-query-validator-types';
import { Request, Response } from 'express';
import { queryRepository } from '../../queryRepositories/query-repository';
import { ObjectId } from 'mongodb';
import { variablesForGetDataSlicesFunc } from '../utils/getVariablesForGetDataSlicesFunc/variablesForGetDataSlicesFunc';
import { PostsDbType, RequestPostType } from '../../types/posts-types/posts-type';
import { postsService } from '../../services/posts-service/posts-service';
import { BlogsDbType } from '../../types/blogs-types/blogs-type';

export const postsController = {
  getPosts: async (req: Request<unknown, unknown, unknown, QueryParamsWithFormattedSorts>, res: Response) => {
    try {
      const { searchNameTerm } = req.query;
      const totalCount = await queryRepository.getTotalCount('posts', 'title', searchNameTerm);

      const variables = variablesForGetDataSlicesFunc(req.query, totalCount);

      const posts = await queryRepository.getCollection<PostsDbType>('posts', 'title', variables.variablesForGetData);

      const postsWithId = queryRepository.mapToResponseWithId(posts);

      const postsWithPagination = queryRepository.mapToResponseWithPagination(
        postsWithId,
        variables.variablesForPagination,
      );

      if (postsWithPagination.items.length || !searchNameTerm) {
        res.status(200).send(postsWithPagination);
      } else {
        res.sendStatus(404);
      }
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
