import { Request, Response } from 'express';
import { usersService } from '../../services/users-service/user-service';
import { queryRepository } from '../../queryRepository/query-repository';
import { UsersDbType, UsersDbWithIdType } from '../../types/users-types/users-types';
import { usersMapping } from '../../mapping/users-mapping/users-mapping';

import { variablesForGetDataSlicesFunc } from '../utils/getVariablesForGetDataSlicesFunc/variablesForGetDataSlicesFunc';
import { QueryParamsUsersWithFormattedSorts } from '../../types/general-types/general-query-validator-types';

export const usersController = {
  getUsers: async (req: Request<unknown, unknown, unknown, QueryParamsUsersWithFormattedSorts>, res: Response) => {
    try {
      const { searchBy, formattedSorts, pageNumber, pageSize, searchEmailTerm, searchLoginTerm } = req.query;

      const totalCount = await queryRepository.getTotalCount(
        'users',
        searchBy,
        searchBy === 'email' ? searchEmailTerm : searchLoginTerm,
      );
      const variables = variablesForGetDataSlicesFunc(
        {
          searchTerm: searchBy === 'email' ? searchEmailTerm : searchLoginTerm,
          formattedSorts,
          pageNumber,
          pageSize,
          searchBy,
        },
        totalCount,
      );
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
      const insertOneResultId = await usersService.createUser(req.body);
      const user = await queryRepository.getCollectionItemById<UsersDbWithIdType>(
        insertOneResultId.insertedId,
        'users',
      );
      if (user) {
        const userWithId = queryRepository.mapToResponseWithId(user);
        const userResponse = usersMapping.mapToResponseUsers(userWithId);
        res.status(201).send(...userResponse);
      } else {
        res.sendStatus(404);
      }
    } catch (e: unknown) {
      res.sendStatus(500);
    }
  },
};
