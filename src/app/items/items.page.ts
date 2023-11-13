import {Component} from "@angular/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTabsModule} from "@angular/material/tabs";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";


@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatTabsModule,
    RouterLinkActive,
    RouterOutlet,
    RouterLink
  ]
})
export class ItemsPage {


}
