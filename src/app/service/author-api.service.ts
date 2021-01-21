import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorApiService {

  baseUri: string = 'http://localhost:8080/catalog';
  headers = new HttpHeaders().set('Content-type', 'application/json');

  constructor(private http: HttpClient) { }

  //create
  createAuthor(data): Observable<any> {
    let url = `${this.baseUri}/author/create`;
    return this.http.post(url, data)
    .pipe(
      catchError(this.errorMgmt)
    )
  }

  //get all authors
  getAuthors() {
    return this.http.get(`${this.baseUri}/authors`);
  }

  //get single author
  getAuthor(id): Observable<any> {
    let url = `${this.baseUri}/author/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )

  }

  //update author
  updateAuthor(data): Observable<any> {
    let url = `${this.baseUri}/author/${data.id}`;
    return this.http.put(url, data, {headers: this.headers}).pipe(
      catchError(this.errorMgmt)
    )
  }

  //delete author
  deleteAuthor(id): Observable<any> {
    let url = `${this.baseUri}/author/${id}`;
    return this.http.delete(url, {headers: this.headers}).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
