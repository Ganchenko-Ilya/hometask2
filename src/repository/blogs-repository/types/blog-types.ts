export type BlogDbType = {
  id: string; //string
  name: string; // max-length 15
  description: string; // max-length 500
  websiteUrl: string; // max-length 100,reg: ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
  createdAt: string;
  isMembership: boolean;
};
