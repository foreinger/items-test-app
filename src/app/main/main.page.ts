import {Component, OnInit} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {ProfileFeature} from "./profile/store/profile.state";
import {Observable} from "rxjs";
import {User} from "./users/types/user.types";
import {PROFILE_ACTIONS} from "./profile/store/profile.actions";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    NgIf,
    AsyncPipe
  ]
})
export default class MainPage implements OnInit {

  public me$: Observable<User | null> = this.store$.select(ProfileFeature.selectMe);

  constructor(
    private store$: Store<AppState>,
  ) {
  }

  public ngOnInit(): void {
    this.initMe();
  }

  public logout(): void {
    this.store$.dispatch(PROFILE_ACTIONS.logOut())

  }

  public initMe(): void {
    this.store$.dispatch(PROFILE_ACTIONS.getMe())
  }
}
