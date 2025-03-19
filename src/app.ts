import express, { Request, Response } from 'express';
import { blogsRouters } from './routes/blogs-routers';
import { postsRouters } from './routes/posts-routers';
import { deleteAll } from './testing/deleteAll';
import { SETTINGS } from './settings';

const cors = require('cors');

export const app = express();

app.use(express.json());
app.use(cors());
app.use(SETTINGS.PATH_BLOGS, blogsRouters);
app.use(SETTINGS.PATH_POSTS, postsRouters);

app.delete('/testing/all-data', (req: Request, res: Response) => {
  deleteAll();
  res.status(204).end();
});
