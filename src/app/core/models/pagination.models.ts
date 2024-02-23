import { PaginationParams } from '../types/pagination.types';

export class PaginationParamsDto {
  public pageIndex: number;
  public pageSize: number;

  constructor(data: PaginationParams) {
    this.pageSize = data.pageSize ?? 5;
    this.pageIndex = data.pageIndex ?? 0;
  }
}
