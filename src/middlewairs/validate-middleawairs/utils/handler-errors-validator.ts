import { RequestHandler } from 'express';
import { FieldValidationError, validationResult } from 'express-validator';

import { ParamsDictionary } from 'express-serve-static-core';
import { ErrorItemType } from '../../../types/error-types/error-response-types';

export const handlerErrorsValidator: RequestHandler<ParamsDictionary, unknown, unknown, Record<string, unknown>> = (
  req,
  res,
  next,
) => {
  const appValidationResult = validationResult.withDefaults<ErrorItemType>({
    formatter: (error: unknown) => {
      const errorField = error as FieldValidationError;
      return { message: errorField.msg, field: errorField.path };
    },
  });

  const result = appValidationResult(req);

  if (!result.isEmpty()) {
    const errorsMessages = result.array({ onlyFirstError: true });
    res.status(400).send({ errorsMessages });
  } else {
    next();
  }
};
