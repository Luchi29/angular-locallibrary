import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GenreApiService {
  baseUri: string = 'http://localhost:8080/catalog';
  headers = new HttpHeaders().set('Content-type', 'application/json');

  constructor(private http: HttpClient) {}

  //Create
  createGenre(data): Observable<any> {
    let url = `${this.baseUri}/genre/create`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  // get all genres
  getGenres() {
    return this.http.get(`${this.baseUri}/genres`);
  }

  //get single genre
  getGenre(id): Observable<any> {
    let url = `${this.baseUri}/genre/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  //update genre
  updateGenre(data): Observable<any> {
    let url = `${this.baseUri}/genre/${data.id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  //delete genre
  deleteGenre(id): Observable<any> {
    let url = `${this.baseUri}/genre/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      //get client side error
      errorMessage = error.error.message;
    } else {
      //get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
