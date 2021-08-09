import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  static isLogin(): boolean {
    return !!localStorage.getItem('userData');
  }
}
