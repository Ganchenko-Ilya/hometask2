import { Collection, MongoClient } from 'mongodb';
import { SETTINGS } from '../settings';
import { BlogDbType } from '../repository/blogs-repository/types/blog-types';
import { PostDbType } from '../repository/posts-repository/types/post-types';

const uri = SETTINGS.MONGO_URL;

const client = new MongoClient(uri);

const db = client.db('blogsPlatform');

export let blogsCollection: Collection<BlogDbType>;
export let postsCollection: Collection<PostDbType>;

export async function run() {
  try {
    await client.connect();

    await client.db('admin').command({ ping: 1 });

    blogsCollection = db.collection('blogs');
    postsCollection = db.collection('posts');

    console.log('Pinged your deployment. You successfully connected to MongoDB!');
    return true;
  } catch (error) {
    await client.close();
    return false;
  }
}
