import {Component, OnInit, ViewChild} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {Pagination, PaginationParams} from "../../../core/interfaces/pagination.interfaces";
import {TypeStatistic} from "../../interfaces/item.interface";
import {ItemsService} from "../../services/items.service";
import {PaginationParamsDto} from "../../../core/models/pagination.models";
import {NgIf} from "@angular/common";

export interface StatisticElement {
  type: string;
  count: number;
}

const ELEMENT_DATA: StatisticElement[] = [
  {type: 'Hydrogen', count: 10},
  {type: 'Helium', count: 10},
  {type: 'Lithium', count: 10},
  {type: 'Beryllium', count: 10},
  {type: 'Boron', count: 10},
  {type: 'Carbon', count: 10},
  {type: 'Nitrogen', count: 10},
  {type: 'Oxygen', count: 10},
  {type: 'Fluorine', count: 10},
  {type: 'Neon', count: 10},
];

@Component({
  selector: 'app-item-statistic',
  templateUrl: './item-statistic.component.html',
  styleUrls: ['./item-statistic.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    NgIf
  ]
})
export default class ItemStatisticComponent implements OnInit {

  dataSource = ELEMENT_DATA;

  public page: Pagination<TypeStatistic[]> | undefined;
  displayedColumns: string[] = ['type', 'count'];

  @ViewChild(MatPaginator)
  public paginator: MatPaginator | undefined;

  constructor(
    private itemsService: ItemsService,
  ) {
  }

  public ngOnInit(): void {
    this.loadStatistic();
  }

  public loadStatistic(paginationData?: PaginationParams): void {
    const payload = paginationData ? new PaginationParamsDto(paginationData) : undefined;
    this.itemsService.getStatistic(payload)
      .subscribe((res) => this.page = res)
  }
}
