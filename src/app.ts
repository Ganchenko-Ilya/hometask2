import express from 'express';
import { blogsRouters } from './routes/blogs-routers';
import { postsRouters } from './routes/posts-routers';

export const app = express();

app.use(express.json());

app.use('/blogs', blogsRouters);
app.use('/posts', postsRouters);
