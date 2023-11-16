export type PaginationParams = {
  pageIndex: number;
  pageSize: number;
}

export type Pagination<T> = {
  data: T;
  total: number;
} & PaginationParams
