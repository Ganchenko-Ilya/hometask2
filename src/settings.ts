import dotenv from 'dotenv';

dotenv.config();

export const SETTINGS = {
  ADMIN_AUTH: process.env.ADMIN_AUTH,
  PORT: process.env.PORT || 3003,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017',
  PATH_BLOGS: '/blogs',
  PATH_POSTS: '/posts',
};
