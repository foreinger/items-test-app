import {Component, OnInit} from "@angular/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTabsModule} from "@angular/material/tabs";
import {Router, RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";


@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule
  ]
})
export class ItemsPage implements OnInit {

  constructor(
    public router: Router,
  ) {
  }

  public ngOnInit(): void {
  }


}
