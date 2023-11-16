import {PaginationParams} from "../types/pagination.types";

export class PaginationParamsDto {
  public pageIndex: number;
  public pageSize: number;

  constructor(data: PaginationParams) {
    this.pageSize = data.pageSize;
    this.pageIndex = data.pageIndex;
  }
}
