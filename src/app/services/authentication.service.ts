import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private isloggedSubject: BehaviorSubject<boolean>;
  isuserName: string = '';
  constructor() {
    this.isloggedSubject = new BehaviorSubject<boolean>(this.isUserExist);

    console.log(this.isuserName);
  }

  login(userName: string, password: string) {
    const rand = () => {
      return Math.random().toString(36).substr(2);
    };

    const token = () => {
      return rand() + rand();
    };

    console.log(token());
    let usrToken = token();
    this.isuserName = userName;
    localStorage.setItem('token', usrToken);
    localStorage.setItem('name', userName);

    console.log(userName, password);
    this.isloggedSubject.next(true);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');

    this.isloggedSubject.next(false);
  }

  get isUserExist(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  getloggedStatus(): Observable<boolean> {
    return this.isloggedSubject.asObservable();
  }
}
