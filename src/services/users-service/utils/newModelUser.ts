import { ObjectId } from 'mongodb';
import { createNewDateFormatISO } from '../../utils/createNewDateFormatISO';
import bcrypt from 'bcrypt';
import { UsersDbType } from '../../../types/users-types/users-types';

export const newModelUser = async (reqBody: any): Promise<UsersDbType> => {
  const { login, password, email } = reqBody;

  const passwordSalt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, passwordSalt);
  return { _id: new ObjectId(), login, email, passwordHash, passwordSalt, createdAt: createNewDateFormatISO() };
};
