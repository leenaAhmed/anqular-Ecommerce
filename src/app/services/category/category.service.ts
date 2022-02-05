import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICateogray } from '../../Models/icateogray';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  httpOption;
  constructor(private http: HttpClient) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
  getAllCategory(): Observable<ICateogray[]> {
    return this.http.get<ICateogray[]>(`${environment.URL}/category`);
  }
}
