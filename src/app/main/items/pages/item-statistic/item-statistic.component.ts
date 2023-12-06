import {Component, OnInit, ViewChild} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {Pagination, PaginationParams} from "../../../../core/types/pagination.types";
import {TypeStatistic} from "../../types/item.types";
import {AsyncPipe, NgIf} from "@angular/common";
import {Observable} from "rxjs";
import {ItemsFeature} from "../../store/items.state";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../app.state";
import {TYPE_LIST_ACTIONS} from "../../store/items.actions";

@Component({
  selector: 'app-item-statistic',
  templateUrl: './item-statistic.component.html',
  styleUrls: ['./item-statistic.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    NgIf,
    AsyncPipe
  ]
})
export default class ItemStatisticComponent implements OnInit {

  public page$: Observable<Pagination<TypeStatistic> | null> = this.store.select(ItemsFeature.selectTypesPage);

  public displayedColumns: string[] = ['type', 'count'];

  @ViewChild(MatPaginator)
  public paginator: MatPaginator | undefined;

  constructor(
    private store: Store<AppState>,
  ) {
  }

  public ngOnInit(): void {
    this.loadStatistic();
  }

  public loadStatistic(paginationData?: PaginationParams): void {
    this.store.dispatch(TYPE_LIST_ACTIONS.get({paginationData}))
  }
}
