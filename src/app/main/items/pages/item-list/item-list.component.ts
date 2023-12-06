import {Component, OnInit, ViewChild} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {Item, ItemForm} from "../../types/item.types";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Pagination, PaginationParams} from "../../../../core/types/pagination.types";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../app.state";
import {FormGroupState, NgrxFormsModule, ResetAction, SetValueAction} from "ngrx-forms";
import {ItemsFeature} from "../../store/items.state";
import {DELETE_ITEM_ACTIONS, ITEM_LIST_ACTIONS, ITEMS_FORM_ACTIONS} from "../../store/items.actions";
import {NgrxFormErrorStateMatcher} from "../../../../core/material/error-state-matcher";
import {ITEM_FORM_DEFAULT_VALUE, ITEMS_FORMS_IDS} from "../../constants/forms.constants";
import {LetDirective} from "@ngrx/component";

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
    ReactiveFormsModule,
    AsyncPipe,
    NgrxFormsModule,
    FormsModule,
    NgrxFormErrorStateMatcher,
    LetDirective,
  ]
})
export default class ItemListComponent implements OnInit {

  public page$: Observable<Pagination<Item> | null> = this.store.select(ItemsFeature.selectItemsPage);
  public form$: Observable<FormGroupState<ItemForm>> = this.store.select(ItemsFeature.selectItemForm);

  public readonly displayedColumns = ['id', 'name', 'type', 'actions'];

  @ViewChild(MatPaginator)
  public paginator: MatPaginator | undefined;

  constructor(
    private store: Store<AppState>,
  ) {
  }

  public ngOnInit(): void {
    this.loadItems();

  }

  public loadItems(paginationData?: PaginationParams): void {
    this.store.dispatch(ITEM_LIST_ACTIONS.get({paginationData}))
  }

  public submitItemForm(): void {
    this.store.dispatch(ITEMS_FORM_ACTIONS.submit())
  }

  public resetItemForm(): void {
    this.store.dispatch(new SetValueAction(ITEMS_FORMS_IDS.item, ITEM_FORM_DEFAULT_VALUE))
    this.store.dispatch(new ResetAction(ITEMS_FORMS_IDS.item))
  }

  public editItem({id, name, type}: Item): void {
    this.store.dispatch(new SetValueAction(ITEMS_FORMS_IDS.item, {id, name, type: type.name}))
  }

  public deleteItem(id: number): void {
    this.store.dispatch(DELETE_ITEM_ACTIONS.delete({id}))
  }
}
