import {Component, OnInit} from "@angular/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTabsModule} from "@angular/material/tabs";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {UserService} from "../user/user.service";
import {MatButtonModule} from "@angular/material/button";
import {StorageService} from "../core/services/storage.service";
import {StorageKeys} from "../core/enums/storage-keys.enum";


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
    RouterLink,
    MatButtonModule
  ]
})
export class ItemsPage implements OnInit {

  constructor(
    public userService: UserService,
    public storageService: StorageService,
    public router: Router,
  ) {
  }

  public ngOnInit(): void {
    this.initMe();
  }

  public logout(): void {
    this.userService.resetMe();
    this.storageService.clearStorage();
    this.router.navigateByUrl('/auth/login');
  }

  public initMe(): void {
    this.userService.setMe = this.storageService.getRecord(StorageKeys.me);
  }

}
