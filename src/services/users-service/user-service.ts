import { newModelUser } from './utils/newModelUser';
import { usersRepository } from '../../repositories/users-repository/users-repository';

export const usersService = {
  createUser: async (reqBody: any) => {
    const newModel = await newModelUser(reqBody);

    return usersRepository.createUser(newModel);
  },
};
