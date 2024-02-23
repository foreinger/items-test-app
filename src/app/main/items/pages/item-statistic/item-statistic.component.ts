import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Pagination, PaginationParams } from '../../../../core/types/pagination.types';
import { TypeStatistic } from '../../types/item.types';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { ItemsFeature } from '../../store/items.state';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.state';
import { TYPE_STATISTIC_ACTIONS } from '../../store/items.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-statistic',
  templateUrl: './item-statistic.component.html',
  styleUrls: ['./item-statistic.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatPaginatorModule, NgIf, AsyncPipe],
})
export default class ItemStatisticComponent implements OnInit {
  public page$: Observable<Pagination<TypeStatistic> | null> = this.store.select(ItemsFeature.selectTypesStatistic);

  public displayedColumns: string[] = ['type', 'count'];

  @ViewChild(MatPaginator)
  public paginator: MatPaginator | undefined;

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.loadStatistic();
  }

  public loadStatistic(): void {
    this.store.dispatch(TYPE_STATISTIC_ACTIONS.get());
  }

  public paginationChange({ pageIndex, pageSize }: PaginationParams): Promise<boolean> {
    return this.router.navigate([], { queryParams: { pageIndex, pageSize } });
  }
}
