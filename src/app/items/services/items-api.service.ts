import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Item, ItemForm, TypeStatistic} from "../types/item.types";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Pagination, PaginationParams} from "../../core/types/pagination.types";

@Injectable({
  providedIn: 'root'
})
export class ItemsApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getItems(paginationData?: PaginationParams): Observable<Pagination<Item[]>> {
    return this.http.get<Pagination<Item[]>>(`${environment.apiUrl}/items`, {params: paginationData});
  }

  public createItem(payload: ItemForm['value']): Observable<Item> {
    return this.http.post<Item>(`${environment.apiUrl}/items`, payload);
  }

  public editItem(payload: ItemForm['value']): Observable<Item> {
    return this.http.patch<Item>(`${environment.apiUrl}/items`, payload);
  }

  public deleteItem(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/items/${id}`);
  }

  public getStatistic(paginationData?: PaginationParams): Observable<Pagination<TypeStatistic[]>> {
    return this.http.get<Pagination<TypeStatistic[]>>(`${environment.apiUrl}/items/statistic`, {params: paginationData});
  }

}
