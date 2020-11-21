import { Injectable } from '@angular/core';
import {StorageService} from './storage.service';
import {ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthActivateService {

  constructor(private storage: StorageService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let routeUrl;
    if (route.url.length) {
      routeUrl = route.url[0].path;
    }

    if (this.storage.isLoggedIn()) {
      // only admins can add new users
      if (routeUrl === 'onboard') {
        // do something
        return true;
      }
    }
  }
}
