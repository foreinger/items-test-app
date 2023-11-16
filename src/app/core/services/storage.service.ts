import {Injectable} from '@angular/core';
import {StorageKeys} from "../enums/storage-keys.enum";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }


  public getRecord<T>(key: StorageKeys): T | null {
    const rawRecord = localStorage.getItem(key);
    return rawRecord ? JSON.parse(rawRecord) : null;
  }

  public setRecord(key: StorageKeys, value: any): void {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  public clearStorage(): void {
    return localStorage.clear();
  }
}
