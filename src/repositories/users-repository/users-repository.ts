import { usersCollection } from '../../db/db';

export const usersRepository = {
  createUser: (newModel: any) => {
    return usersCollection.insertOne(newModel);
  },
};
