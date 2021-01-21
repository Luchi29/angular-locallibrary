import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookApiService {

  baseUri: string = 'http://localhost:8080/catalog';
  headers = new HttpHeaders().set('Content-type', 'application/json');

  constructor(private http: HttpClient) { }

  //get catalog
  getIndex(): Observable<any> {
    let url = this.baseUri;
    return this.http.get(url);

  }

  //create
  createBook(data): Observable<any> {
    let url = `${this.baseUri}/book/create`;
    return this.http.post(url, data)
      .pipe(catchError(this.errorMgmt)
      )
  }

  //get all books
  getBooks() {
    return this.http.get(`${this.baseUri}/books`);
  }

  //get single book
  getBook(id): Observable<any> {
    let url = `${this.baseUri}/book/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  //update book
  updateBook(data): Observable<any> {
    let url = `${this.baseUri}/book/${data.id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  //delete book
  deleteBook(id): Observable<any> {
    let url = `${this.baseUri}/book/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
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
