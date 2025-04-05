import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { AuthRequestType } from '../../types/auth-types/auth-types';
import { authService } from '../../services/posts-service/auth-service/auth-service';

export const authController = {
  authLogin: async (req: Request<ParamsDictionary, unknown, AuthRequestType>, res: Response) => {
    try {
      const isAuth = await authService.authLogin(req.body.loginOrEmail, req.body.password);
      if (isAuth) {
        res.sendStatus(204);
      } else {
        res.sendStatus(401);
      }
    } catch (e: unknown) {
      res.sendStatus(500);
    }
  },
};
