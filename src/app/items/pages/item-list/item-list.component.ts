import {Component, OnInit, ViewChild} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {NgForOf, NgIf} from "@angular/common";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {Item, ItemForm} from "../../interfaces/item.interface";
import {FormBuilder, FormGroupDirective, ReactiveFormsModule, Validators} from "@angular/forms";
import {ItemsService} from "../../services/items.service";
import {Pagination, PaginationParams} from "../../../core/interfaces/pagination.interfaces";
import {PaginationParamsDto} from "../../../core/models/pagination.models";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    NgIf,
    NgForOf,
    MatPaginatorModule,
    ReactiveFormsModule
  ]
})
export default class ItemListComponent implements OnInit {

  public page: Pagination<Item[]> | undefined;
  public readonly displayedColumns = ['id', 'name', 'type', 'actions'];

  public itemForm: ItemForm | undefined;

  @ViewChild(MatPaginator)
  public paginator: MatPaginator | undefined;

  constructor(
    private itemsService: ItemsService,
    private fb: FormBuilder,
  ) {
  }

  public ngOnInit(): void {
    this.initItemForm();
    this.loadItems();

  }

  public loadItems(paginationData?: PaginationParams): void {
    const payload = paginationData ? new PaginationParamsDto(paginationData) : undefined;
    this.itemsService.getItems(payload)
      .subscribe((res) => this.page = res)
  }

  public initItemForm(item?: Item): void {
    this.itemForm = this.fb.group<ItemForm['controls']>({
      name: this.fb.control<string>(item?.name ?? '', {validators: [Validators.required], nonNullable: true}),
      type: this.fb.control<string>(item?.type.name ?? '', {validators: [Validators.required], nonNullable: true}),
      id: this.fb.control<number | null>(item?.id ?? null),
    })
  }

  public submitItemForm(formDirective: FormGroupDirective): void {

    if (this.itemForm?.invalid) {
      return;
    }

    this.itemsService.submitItemForm(this.itemForm?.getRawValue())
      .subscribe(() => {
        formDirective.resetForm();
        this.initItemForm();
        this.loadItems(this.paginator);
      })
  }

  public deleteItem(id: number): any {
    this.itemsService.deleteItem(id)
      .subscribe(() => {
        this.loadItems(this.paginator);
      })
  }
}
