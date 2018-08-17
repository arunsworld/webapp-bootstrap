import { Injectable } from '@angular/core';
import { RouteReuseStrategy, DetachedRouteHandle, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class RouteReuseStrategyService implements RouteReuseStrategy {
    handles: {[key: string]: DetachedRouteHandle} = {};

    constructor() { }

    private calcKey(route: ActivatedRouteSnapshot) {
        const url = route.pathFromRoot.map(x => x.url.map(u => u.path).join('/')).join(';');
        if (!url.length) { return undefined; }
        return url;
    }

    // this gives the right-most path but can collide if repeated
    private oldCalcKey(route: ActivatedRouteSnapshot) {
        return route.routeConfig.path;
    }

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        // this is required to return false when a route has children
        // otherwise the path's clash when navigating between children
        // this means if a route has children - it should always navigate to a child
        // and the parent should be OK to get re-created
        if (route.routeConfig.path === 'login') { return false; }
        return route.routeConfig.children === undefined ? true : false;
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        this.handles[this.calcKey(route)] = handle;
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return !!route.routeConfig && !!this.handles[this.calcKey(route)];
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle|null {
        if (!route.routeConfig) { return null; }
        return this.handles[this.calcKey(route)];
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }
}
