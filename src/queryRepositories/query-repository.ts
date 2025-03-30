import { db } from '../db/db';
import { PaginationType } from '../types/blogs-types/blogs-type';
import { VariablesForGetBlogsType } from '../types/general-types/general-query-validator-types';
import { ObjectId, WithId, Filter, Document } from 'mongodb';

export const queryRepository = {
  getCollection: async <T extends Document>(
    nameCollection: string,
    searchName: keyof T,
    queryParams: VariablesForGetBlogsType,
    filterBy?: Record<string, unknown>,
  ): Promise<WithId<T>[]> => {
    const { pageSize, searchNameTerm, formattedSorts, skipBlogs } = queryParams;

    const filters = { [searchName]: { $regex: searchNameTerm, $options: 'i' }, ...filterBy } as Filter<T>;

    const data = await db
      .collection<T>(nameCollection)
      .find(filters)
      .sort(formattedSorts)
      .skip(skipBlogs)
      .limit(pageSize)
      .toArray();

    return data;
  },
  getCollectionItemById: async <T extends Document>(_id: ObjectId, nameCollection: string) => {
    const filter = { _id } as Filter<T>;
    return db.collection<T>(nameCollection).findOne(filter);
  },
  mapToResponseWithId: <T extends { _id: ObjectId }>(data: T[] | T) => {
    const responseData = [];
    if (Array.isArray(data)) {
      for (let item of data) {
        const { _id, ...rest } = item;

        responseData.push({ ...rest, id: item._id.toString() });
      }
    } else {
      const { _id, ...newData } = data;
      responseData.push({ ...newData, id: data._id.toString() });
    }

    return responseData;
  },

  mapToResponseWithPagination: <T>(data: T[], pagination: PaginationType) => {
    return { ...pagination, items: data };
  },
  getTotalCount: async (
    nameCollection: string,
    searchBy: string,
    searchNameTerm: string,
    filterBy?: Record<string, unknown>,
  ) => {
    return db.collection(nameCollection).countDocuments({
      [searchBy]: {
        $regex: searchNameTerm,
        $options: 'i',
      },
      ...filterBy,
    });
  },
};
