import {ActivatedRouteSnapshot, BaseRouteReuseStrategy} from "@angular/router";


export class AppRoutingStrategy extends BaseRouteReuseStrategy {
  private routesToNotReuse: string[] = [':id', 'statistic', 'list'];


  override shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    if (!future.routeConfig?.path || !curr.routeConfig?.path) {
      return super.shouldReuseRoute(future, curr);
    }
    return !this.routesToNotReuse.includes(future.routeConfig?.path);
  }
}
