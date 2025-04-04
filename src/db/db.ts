import { MongoClient } from 'mongodb';
import { SETTINGS } from '../settings';
import { PostsDbType } from '../types/posts-types/posts-type';
import { BlogsDbType } from '../types/blogs-types/blogs-type';
import { UsersDbType } from '../types/users-types/users-types';

const uri = SETTINGS.MONGO_URL;

const client = new MongoClient(uri);

export const db = client.db('blogsPlatform');

export let blogsCollection = db.collection<BlogsDbType>('blogs');
export let postsCollection = db.collection<PostsDbType>('posts');
export let usersCollection = db.collection<UsersDbType>('users');

export async function run() {
  try {
    await client.connect();

    await client.db('admin').command({ ping: 1 });

    console.log('Pinged your deployment. You successfully connected to MongoDB!');
    return true;
  } catch (error) {
    await client.close();
    return false;
  }
}
