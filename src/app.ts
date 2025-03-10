import express, { Request, Response } from 'express';
import { blogsRouters } from './routes/blogs-routers';
import { postsRouters } from './routes/posts-routers';
import { deleteAll } from './testing/deleteAll';

const cors = require('cors');
export const app = express();

app.use(express.json());
app.use(cors());
app.use('/blogs', blogsRouters);
app.use('/posts', postsRouters);

app.delete('/testing/all-data', (req: Request, res: Response) => {
  deleteAll();
  res.status(204).end();
});
