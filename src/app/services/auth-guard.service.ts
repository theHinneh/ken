import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {StorageService} from './storage.service';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private storage: StorageService, private router: Router, private location: Location) {
  }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   let routeUrl;
  //   if (route.url.length) {
  //     routeUrl = route.url[0].path;
  //   }
  //
  //   if (this.storage.isLoggedIn()) {
  //     // only admins can add new users
  //     if (routeUrl === 'onboard') {
  //       // do something
  //       return true;
  //     }
  //   }
  // }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const query: any = this.getParsedQueryString();

    if (query.access_token) {
      console.log('token found in query param. Permitting user');
      this.storage.saveToken(query.access_token);
      this.storage.saveUserData(JSON.parse(decodeURIComponent(query.userInfo)));
      this.router.navigate(['/']);
    } else {
      return true;

    }
  }

  private getParsedQueryString = () => {
    const pathFragments = this.location.path(true);
    return this.parseQueryString(pathFragments);
  }

  parseQueryString = (queryString) => {
    const params = {};
    // remove path until ?
    const startFrom = queryString.indexOf('?');
    if (startFrom > -1) {
      const queries = queryString.substring(startFrom + 1).split(';');
      queries.forEach(query => {
        const keyValQuery = query.split('=');
        if (keyValQuery.length === 2) {
          params[keyValQuery[0]] = keyValQuery[1];
        }
      });
    }

    return params;
  }
}
