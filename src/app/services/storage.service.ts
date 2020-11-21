import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  saveUserData(data): void {
    localStorage.setItem('_user_', data);
  }

  saveToken(token): void {
    localStorage.setItem('_token_', token);
  }

  getToken(): any {
    return localStorage.getItem('_token_');
  }

  getUserData(): any {
    return localStorage.getItem('_user_');
  }

  isLoggedIn(): boolean {
    return true;
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }
}
