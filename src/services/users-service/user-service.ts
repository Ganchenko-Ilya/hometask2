import { newModelUser } from './utils/newModelUser';
import { usersRepository } from '../../repositories/users-repository/users-repository';
import { UsersRequestType } from '../../types/users-types/users-types';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

export const usersService = {
  createUser: async (reqBody: UsersRequestType) => {
    const isUniqueLogin = await usersRepository.getUserByLogin(reqBody.login);
    const isUniqueEmail = await usersRepository.getUserByEmail(reqBody.email);
    if (!isUniqueLogin && !isUniqueEmail) {
      const newModel = await newModelUser(reqBody);
      const response = await usersRepository.createUser(newModel);
      return { res: response };
    } else {
      if (isUniqueLogin) {
        return { error: { errorsMessages: [{ field: 'login', message: 'login should be unique' }] } };
      } else {
        return { error: { errorsMessages: [{ field: 'email', message: 'email should be unique' }] } };
      }
    }
  },

  deleteUserById: (_id: ObjectId) => {
    return usersRepository.deleteUserById(_id);
  },
};
