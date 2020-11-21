import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';
import {throwError as observableThrowError} from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(private storage: StorageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.storage) {
      const token = this.storage.getToken();
      let authString = '';
      if (token) {
        authString = 'Bearer ' + token;
        request = request.clone({headers: request.headers.set('Authorization', `${authString}`)});
      }
    }
    const url = request.url.startsWith('/') ? `${environment.baseUrl}${request.url}` : `${environment.baseUrl}/${request.url}`;
    request = request.clone({
      url
    });
    console.log('URL:', request.url);
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401 || err.status === 403) {
          // key expired - clear token and navigate to login
          this.storage.clearLocalStorage();
          // this.router.navigate(['/login']);
          return null;
        } else {
          return observableThrowError(err);
        }
      }
    }));
  }
}
