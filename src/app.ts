import express from 'express';
import { blogsRouters } from './routes/blogs-routers';
import { postsRouters } from './routes/posts-routers';

const cors = require('cors');
export const app = express();

app.use(express.json());
app.use(cors());
app.use('/blogs', blogsRouters);
app.use('/posts', postsRouters);
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; connect-src 'self' http://localhost:3003");
  next();
});
