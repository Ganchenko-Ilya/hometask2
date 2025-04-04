import { query } from 'express-validator';
import { RequestHandler } from 'express';

const searchTermSanitizer: RequestHandler = (req, res, next) => {
  const { searchLoginTerm, searchEmailTerm } = req.query;
  const searchBy = searchLoginTerm || searchEmailTerm;
  if (searchBy) {
    req.query.searchBy = searchBy;
  }
  next();
};

export const querySearchUsersSanitizers = [searchLoginTermSanitizer, searchEmailTermSanitizer, searchTermSanitizer];
