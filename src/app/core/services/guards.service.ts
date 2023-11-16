import {Injectable} from '@angular/core';
import {StorageService} from "./storage.service";
import {StorageKeys} from "../enums/storage-keys.enum";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class GuardsService {

  constructor(
    private storage: StorageService,
    private router: Router,
  ) {
  }

  public async authGuard(): Promise<boolean> {

    const token = this.storage.getRecord<string>(StorageKeys.authToken);

    if (!token) {
      return this.router.navigateByUrl('/auth/login')
    }

    return Boolean(token);
  }
}
