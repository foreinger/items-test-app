import { Component, OnInit, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Item, ItemForm, ItemType } from '../../types/item.types';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Pagination, PaginationParams } from '../../../../core/types/pagination.types';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.state';
import { FormGroupState, NgrxFormsModule, ResetAction, SetValueAction } from 'ngrx-forms';
import { ItemsFeature } from '../../store/items.state';
import {
  DELETE_ITEM_ACTIONS,
  ITEM_LIST_ACTIONS,
  ITEMS_FORM_ACTIONS,
  TYPES_AUTOCOMPLETE_ACTIONS,
} from '../../store/items.actions';
import { NgrxFormErrorStateMatcher } from '../../../../core/material/error-state-matcher';
import { ITEM_FORM_DEFAULT_VALUE, ITEMS_FORMS_IDS } from '../../constants/forms.constants';
import { LetDirective } from '@ngrx/component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../../users/types/user.types';
import { ProfileFeature } from '../../../profile/store/profile.state';
import { CHAT_ACTIONS } from '../../../chat/store/chat.actions';

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
    MatAutocompleteModule,
    RouterLink,
    MatIconModule,
  ],
})
export default class ItemListComponent implements OnInit {
  public page$: Observable<Pagination<Item> | null> = this.store.select(ItemsFeature.selectItemsPage);
  public form$: Observable<FormGroupState<ItemForm>> = this.store.select(ItemsFeature.selectItemForm);
  public me$: Observable<User | null> = this.store.select(ProfileFeature.selectMe);
  public typesAutocomplete$: Observable<ItemType[] | null> = this.store.select(
    ItemsFeature.selectTypeAutocompleteOptions,
  );

  public readonly displayedColumns = ['id', 'name', 'type', 'creator', 'actions'];

  @ViewChild(MatPaginator)
  public paginator: MatPaginator | undefined;

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.loadItems();
  }

  public loadItems(): void {
    this.store.dispatch(ITEM_LIST_ACTIONS.get());
  }

  public submitItemForm(): void {
    this.store.dispatch(ITEMS_FORM_ACTIONS.submit());
  }

  public resetItemForm(): void {
    // set default value
    this.store.dispatch(new SetValueAction(ITEMS_FORMS_IDS.item, ITEM_FORM_DEFAULT_VALUE));
    // reset form validation
    this.store.dispatch(new ResetAction(ITEMS_FORMS_IDS.item));
    // reset autocomplete
    this.store.dispatch(TYPES_AUTOCOMPLETE_ACTIONS.set({ typeAutocompleteOptions: null }));
  }

  public editItem({ id, name, type }: Item): void {
    this.store.dispatch(new SetValueAction(ITEMS_FORMS_IDS.item, { id, name, type: type.name }));
  }

  public deleteItem(id: number): void {
    this.store.dispatch(DELETE_ITEM_ACTIONS.delete({ id }));
  }

  public getExistingTypes(): void {
    this.store.dispatch(TYPES_AUTOCOMPLETE_ACTIONS.get());
  }

  public chatToUser(userId: string) {
    this.store.dispatch(CHAT_ACTIONS.initRoom({ userId }));
  }

  public paginationChange({ pageIndex, pageSize }: PaginationParams): Promise<boolean> {
    return this.router.navigate([], { queryParams: { pageIndex, pageSize } });
  }
}
