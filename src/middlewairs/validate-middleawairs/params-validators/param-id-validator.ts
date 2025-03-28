import { param } from 'express-validator';

export const paramIdValidator = param('id').isMongoId().withMessage('id shout be is ObjectId Type');
