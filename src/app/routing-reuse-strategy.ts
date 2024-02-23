import {ActivatedRouteSnapshot, BaseRouteReuseStrategy} from "@angular/router";


export class AppRoutingStrategy extends BaseRouteReuseStrategy {
  private routesToNotReuse: string[] = [':id', 'statistic', 'list'];


  override shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    if (!future.routeConfig?.path || !curr.routeConfig?.path) {
      return super.shouldReuseRoute(future, curr);
    }

    if (this.routesToNotReuse.includes(future.routeConfig?.path)) {
      return false;
    }

    return curr.routeConfig?.path == future.routeConfig?.path;
  }
}
