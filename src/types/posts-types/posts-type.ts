import { ObjectId } from 'mongodb';

export type RequestPostType = {
  title: string; //maxLength: 30
  shortDescription: string; //maxLength: 100
  content: string; //maxLength: 1000
  blogId: string;
};

export type RequestPostByBlogIdTyped = Omit<RequestPostType, 'blogId'>;

export type NewModelPostType = RequestPostType & {
  blogName: string;
  createdAt: string;
};
export type PostsDbType = NewModelPostType & { _id?: ObjectId };
