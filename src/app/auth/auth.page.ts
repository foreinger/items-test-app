import {Component} from "@angular/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.page.html',
  styleUrls: ['auth.page.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterOutlet,
    RouterLink,
  ]
})
export class AuthPage {

}
