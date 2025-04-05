import express, { Request, Response } from 'express';
import { blogsRouters } from './routes/blogs-routers';
import { postsRouters } from './routes/posts-routers';
import { deleteAll } from './testing/delete-controller/deleteAll';
import { SETTINGS } from './settings';
import { usersRouters } from './routes/users-routes';
import { authRouters } from './routes/auth-routes';

const cors = require('cors');

export const app = express();

app.use(express.json());
app.use(cors());
app.use(SETTINGS.PATH_BLOGS, blogsRouters);
app.use(SETTINGS.PATH_POSTS, postsRouters);
app.use(SETTINGS.PATH_USERS, usersRouters);
app.use(SETTINGS.PATH_AUTH, authRouters);

app.delete('/testing/all-data', (req: Request, res: Response) => {
  deleteAll();

  res.sendStatus(204);
});
