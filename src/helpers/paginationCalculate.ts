import { SortOrder } from 'mongoose';

type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  orderBy?: SortOrder;
};

type IReturnOPtions = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  orderBy: SortOrder;
};

const paginationCalculate = (paginationOption: IOptions): IReturnOPtions => {
  const page = Number(paginationOption.page) || 1;
  const limit = Number(paginationOption.limit) || 10;
  const skip = (page - 1) * limit;

  const sortBy = paginationOption.sortBy || 'createdAt';
  const orderBy = paginationOption.orderBy || 'desc';

  return {
    page,
    limit,
    skip,
    sortBy,
    orderBy,
  };
};

export const paginationHelper = {
  paginationCalculate,
};
