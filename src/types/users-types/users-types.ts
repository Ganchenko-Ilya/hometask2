import { ObjectId } from 'mongodb';

export type UsersDbType = {
  _id: ObjectId;
  login: string;
  email: string;
  createdAt: string;
  passwordHash: string;
  passwordSalt: string;
};

export type UsersDbWithIdType = Omit<UsersDbType, '_id'> & { id: string };

export type UsersResponseType = {
  id: string;
  login: string;
  email: string;
  createdAt: string;
};
