import {Injectable} from '@angular/core';
import {ItemsApiService} from "./items-api.service";
import {catchError, filter, Observable, of, switchMap} from "rxjs";
import {Item, ItemForm, TypeStatistic} from "../types/item.types";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../components/confirm-dialog/confirm-dialog.component";
import {Pagination, PaginationParams} from "../../core/types/pagination.types";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(
    private api: ItemsApiService,
    private dialog: MatDialog
  ) {
  }

  public getItems(payload?: PaginationParams): Observable<Pagination<Item[]>> {
    return this.api.getItems(payload)
      .pipe(
        catchError((er) => of({
          data: [],
          total: 0,
          pageIndex: 0,
          pageSize: 0,
        })));
  }

  public submitItemForm(formValue: ItemForm['value'] | undefined): Observable<any> {

    if (!formValue) {
      throw 'There is no form value';
    }
    const {id, name, type} = formValue;

    if (id) {
      return this.api.editItem({id, name, type})
    } else {
      return this.api.createItem({name, type})
    }
  }

  public deleteItem(id: number): Observable<any> {
    return this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .pipe(
        filter((confirm: Boolean) => Boolean(confirm)),
        switchMap(() => this.api.deleteItem(id))
      );
  }

  public getStatistic(paginationData?: PaginationParams): Observable<Pagination<TypeStatistic[]>> {
    return this.api.getStatistic(paginationData);
  }
}
