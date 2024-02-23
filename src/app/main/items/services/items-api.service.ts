import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item, ItemForm, ItemType, TypeStatistic } from '../types/item.types';
import { environment } from '../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { Pagination, PaginationParams } from '../../../core/types/pagination.types';
import { ResponsePayload } from '../../../core/types/response-payload.types';

@Injectable({
  providedIn: 'root',
})
export class ItemsApiService {
  constructor(private http: HttpClient) {}

  public getItems(paginationData?: PaginationParams): Observable<Pagination<Item>> {
    return this.http.get<Pagination<Item>>(`${environment.apiUrl}/items`, { params: paginationData });
  }

  public createItem(payload: ItemForm): Observable<Item> {
    return this.http.post<ResponsePayload<Item>>(`${environment.apiUrl}/items`, payload).pipe(map((res) => res.data));
  }

  public editItem(payload: ItemForm): Observable<Item> {
    return this.http.patch<ResponsePayload<Item>>(`${environment.apiUrl}/items`, payload).pipe(map((res) => res.data));
  }

  public deleteItem(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/items/${id}`);
  }

  public getTypeStatistic(params: PaginationParams): Observable<Pagination<TypeStatistic>> {
    return this.http.get<Pagination<TypeStatistic>>(`${environment.apiUrl}/items/statistic`, { params });
  }

  public getTypesAutocomplete(input: string): Observable<ResponsePayload<ItemType[]>> {
    return this.http.get<ResponsePayload<ItemType[]>>(`${environment.apiUrl}/items/types-autocomplete`, {
      params: { input },
    });
  }
}
