import { Request, Response } from 'express';
import { usersService } from '../../services/users-service/user-service';
import { queryRepository } from '../../queryRepository/query-repository';
import { UsersDbType, UsersDbWithIdType } from '../../types/users-types/users-types';
import { usersMapping } from '../../queryRepository/mapping/users-mapping/users-mapping';

import { variablesForGetDataSlicesFunc } from '../utils/getVariablesForGetDataSlicesFunc/variablesForGetDataSlicesFunc';
import {
  QueryParamsUsersWithFormattedSorts,
  SearchItems,
} from '../../types/general-types/general-query-validator-types';
import { createSearchFilters } from '../utils/getVariablesForGetDataSlicesFunc/halpers/createSearchFilters';
import { ObjectId } from 'mongodb';

export const usersController = {
  getUsers: async (req: Request<unknown, unknown, unknown, QueryParamsUsersWithFormattedSorts>, res: Response) => {
    try {
      const { formattedSorts, pageNumber, pageSize, searchEmailTerm, searchLoginTerm } = req.query;

      const searchItems: SearchItems[] = [];

      const isSearchLoginTerm = !!searchLoginTerm;
      const isSearchEmailTerm = !!searchEmailTerm;
      if (isSearchLoginTerm) {
        searchItems.push({ searchBy: 'login', searchTerm: searchLoginTerm });
      }
      if (isSearchEmailTerm) {
        searchItems.push({ searchBy: 'email', searchTerm: searchEmailTerm });
      }
      const searchFilters = createSearchFilters(searchItems);

      const totalCount = await queryRepository.getTotalCount('users', searchFilters);

      const variables = variablesForGetDataSlicesFunc({
        formattedSorts,
        pageNumber,
        pageSize,
        totalCount,
        searchFilters,
      });

      const users = await queryRepository.getCollection<UsersDbType>('users', variables.variablesForGetData);
      const usersWithId = queryRepository.mapToResponseWithId(users);
      const usersResponse = usersMapping.mapToResponseUsers(usersWithId);
      const usersResponseWithPagination = queryRepository.mapToResponseWithPagination(
        usersResponse,
        variables.variablesForPagination,
      );

      res.status(200).send(usersResponseWithPagination);
    } catch (e: unknown) {
      res.sendStatus(500);
    }
  },
  createUser: async (req: Request, res: Response) => {
    try {
      const result = await usersService.createUser(req.body);

      if (result.res) {
        const user = await queryRepository.getCollectionItemById<UsersDbWithIdType>(result.res.insertedId, 'users');
        if (user) {
          const userWithId = queryRepository.mapToResponseWithId(user);
          const userResponse = usersMapping.mapToResponseUsers(userWithId);
          res.status(201).send(...userResponse);
        } else {
          res.sendStatus(404);
        }
      } else {
        res.status(400).send(result.error);
      }
    } catch (e: unknown) {
      res.sendStatus(500);
    }
  },
  deleteUserById: async (req: Request<{ id: string }>, res: Response) => {
    try {
      const _id = new ObjectId(req.params.id);
      const userById = await usersService.deleteUserById(_id);

      if (userById.deletedCount) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    } catch (e: unknown) {
      res.sendStatus(500);
    }
  },
};
