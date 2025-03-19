import { Collection, MongoClient } from 'mongodb';
import { SETTINGS } from '../settings';
import { BlogsCollectionType, PostsCollectionType } from './type/collectionsType';

const uri = SETTINGS.MONGO_URL;

const client = new MongoClient(uri);

const db = client.db('blogsPlatform');

export let blogsCollection: Collection<BlogsCollectionType>;
export let postsCollection: Collection<PostsCollectionType>;

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
