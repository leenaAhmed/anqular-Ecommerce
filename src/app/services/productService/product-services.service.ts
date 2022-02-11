import {
  catchError,
  flatMap,
  map,
  Observable,
  retry,
  throwError,
  toArray,
} from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IProduct } from '../../Models/iproduct';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductServicesService {
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

  getAllProducts(): Observable<IProduct[]> {
    return this.http
      .get<IProduct[]>(`${environment.URL}/products`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getProductByCategoryId(id: number): Observable<IProduct[]> {
    return this.http
      .get<IProduct[]>(`${environment.URL}/products?CateogryId=${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http
      .get<IProduct>(`${environment.URL}/products/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }
  getProductIDs(): any {
    let ids = this.getAllProducts().forEach((product) => product);
    return ids;
  }
  getAddNewProduct(product: IProduct): Observable<IProduct> {
    return this.http
      .post<IProduct>(
        `${environment.URL}/products`,
        JSON.stringify(product),
        this.httpOption
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  deleteProduct(id: number): Observable<IProduct> {
    return this.http.delete<IProduct>(
      `${environment.URL}/products/${id}`,
      this.httpOption
    );
  }
  updateProductDetails(product: IProduct, id: number): Observable<IProduct[]> {
    return this.http
      .put<IProduct[]>(
        `${environment.URL}/products/${id}`,
        JSON.stringify(product),
        this.httpOption
      )
      .pipe(retry(1), catchError(this.handleError));
  }
}
