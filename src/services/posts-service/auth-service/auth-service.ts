import { usersRepository } from '../../../repositories/users-repository/users-repository';
import bcrypt from 'bcrypt';

export const authService = {
  authLogin: async (loginOrEmail: string, password: string) => {
    const user = await usersRepository.authLogin(loginOrEmail);
    if (user) {
      const hash = await bcrypt.hash(password, user.passwordSalt);
      if (hash === user.passwordHash) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
};
