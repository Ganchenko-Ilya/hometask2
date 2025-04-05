import { UsersDbWithIdType, UsersResponseType } from '../../../types/users-types/users-types';

export const usersMapping = {
  mapToResponseUsers: <T extends UsersDbWithIdType>(users: T[] | T) => {
    const responseUsers: UsersResponseType[] = [];
    if (Array.isArray(users)) {
      for (let item of users) {
        const { createdAt, email, id, login, ...rest } = item;

        responseUsers.push({ id: id.toString(), login, email, createdAt });
      }
    } else {
      const { createdAt, email, id, login, ...rest } = users;
      responseUsers.push({ id: id.toString(), login, email, createdAt });
    }

    return responseUsers;
  },
};
