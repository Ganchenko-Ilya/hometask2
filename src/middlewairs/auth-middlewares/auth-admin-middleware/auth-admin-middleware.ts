import { NextFunction, Request, Response } from 'express';
import { SETTINGS } from '../../../settings';

const ADMIN_AUTH = SETTINGS.ADMIN_AUTH;

export const authAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const authToUTF8 = Buffer.from(authorization.slice(6), 'base64').toString('utf-8');

    const isFirsPartCorrected = authorization.slice(0, 5) === 'Basic';
    const isSecondPartCorrected = authToUTF8 === ADMIN_AUTH;
    if (isFirsPartCorrected && isSecondPartCorrected) {
      next();
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
};
