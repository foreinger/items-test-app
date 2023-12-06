import {Component} from '@angular/core';
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
  imports: [
    RouterModule
  ]
})
export class UsersPage {

}
