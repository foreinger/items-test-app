import {PaginationParams} from "../interfaces/pagination.interfaces";

export class PaginationParamsDto {
  public pageIndex: number;
  public pageSize: number;

  constructor(data: PaginationParams) {
    this.pageSize = data.pageSize;
    this.pageIndex = data.pageIndex;
  }
}
