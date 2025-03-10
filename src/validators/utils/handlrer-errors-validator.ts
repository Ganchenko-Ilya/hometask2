import { NextFunction, Request, Response } from 'express';
import { FieldValidationError, Result, validationResult } from 'express-validator';

export const handlerErrorsValidator = (req: Request, res: Response, next: NextFunction) => {
  const result: Result = validationResult(req);

  if (result.isEmpty()) {
    next();
  } else {
    const errorsMessages = result.array({ onlyFirstError: true }).map((el: FieldValidationError) => ({
      message: el.msg,
      field: el.path,
    }));
    res.status(400).send({ errorsMessages });
  }
};
