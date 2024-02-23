import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  public static fromResizeObserver(element: HTMLElement): Observable<DOMRectReadOnly> {
    return new Observable((observer) => {
      const rObserver = new ResizeObserver(([elResize]) => observer.next(elResize.contentRect));
      rObserver.observe(element);

      return function unsubscribe(): void {
        rObserver.unobserve(element);
      };
    });
  }
}
