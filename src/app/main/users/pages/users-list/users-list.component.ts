import { Component, OnInit, ViewChild } from '@angular/core';
import { Pagination, PaginationParams } from '../../../../core/types/pagination.types';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.state';
import { USERS_ACTIONS } from '../../store/users.actions';
import { UsersFeature } from '../../store/users.state';
import { Observable } from 'rxjs';
import { User } from '../../types/user.types';
import { CHAT_ACTIONS } from '../../../chat/store/chat.actions';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatPaginatorModule, MatTableModule, NgIf, RouterLink, AsyncPipe],
})
export default class UsersListComponent implements OnInit {
  public page$: Observable<Pagination<User> | null> = this.store.select(UsersFeature.selectUsersPage);
  public readonly displayedColumns = ['id', 'username', 'actions'];

  @ViewChild(MatPaginator)
  public paginator: MatPaginator | undefined;

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.loadUsers();
  }

  public loadUsers(): void {
    this.store.dispatch(USERS_ACTIONS.get());
  }

  public chatToUser(userId: string) {
    this.store.dispatch(CHAT_ACTIONS.initRoom({ userId }));
  }

  public paginationChange({ pageIndex, pageSize }: PaginationParams): Promise<boolean> {
    return this.router.navigate([], { queryParams: { pageIndex, pageSize } });
  }
}
