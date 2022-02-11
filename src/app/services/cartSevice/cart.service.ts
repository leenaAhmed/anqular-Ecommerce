import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { ICart } from 'src/app/ViewModels/icart';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  httpOption;

  constructor(private http: HttpClient) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(` ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('something wrong  , please try again'));
  }
  getAllCarts(): Observable<ICart[]> {
    return this.http
      .get<ICart[]>(`${environment.URL}/cart`, this.httpOption)
      .pipe(retry(1), catchError(this.handleError));
  }
  addToCart(product: ICart): Observable<ICart> {
    return this.http
      .post<ICart>(
        `${environment.URL}/cart`,
        JSON.stringify(product),
        this.httpOption
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  deleteCart(id: number): Observable<ICart> {
    return this.http.delete<ICart>(`${environment.URL}/cart/${id}` ,
    this.httpOption
    );
  }
}
