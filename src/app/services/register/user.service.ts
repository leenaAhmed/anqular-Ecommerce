import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUser } from '../../Models/iuser';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpOption;

  constructor(private http: HttpClient) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
  // global error
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(` ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('something wrong  , please try again'));
  }
  AddNewUser(product: IUser): Observable<IUser[]> {
    return this.http
      .post<IUser[]>(
        `${environment.URL}/user`,
        JSON.stringify(product),
        this.httpOption
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  checkEmail(email: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${environment.URL}/user?email=${email}`);
  }
}
