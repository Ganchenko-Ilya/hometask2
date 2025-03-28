export const resDateWithoutMongoId = <
  T extends {
    _id: string;
  },
>(
  date: Array<T> | T,
) => {
  if (Array.isArray(date)) {
    const resArr = date.map((el) => {
      const { _id, ...resDate } = el;
      return resDate;
    });
    return resArr;
  }

  const { _id, ...resObj } = date;
  return resObj;
};
