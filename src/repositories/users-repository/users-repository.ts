import { usersCollection } from '../../db/db';
import { ObjectId } from 'mongodb';

export const usersRepository = {
  getUserByLogin: async (login: string) => {
    return usersCollection.findOne({ login: { $regex: `^${login}$`, $options: 'i' } });
  },
  getUserByEmail: async (email: string) => {
    return usersCollection.findOne({ email: { $regex: `^${email}$`, $options: 'i' } });
  },
  createUser: async (newModel: any) => {
    return usersCollection.insertOne(newModel);
  },
  deleteUserById: async (_id: ObjectId) => {
    return usersCollection.deleteOne({ _id });
  },
  authLogin: async (loginOrEmail: string) => {
    return usersCollection.findOne({
      $or: [
        {
          login: {
            $regex: `^${loginOrEmail}$`,
            $options: 'i',
          },
        },
        {
          email: {
            $regex: `^${loginOrEmail}$`,
            $options: 'i',
          },
        },
      ],
    });
  },
  deleteUsers: () => {
    return usersCollection.drop();
  },
};
