import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './user';
import { HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  BaseURL = 'localhost:8080';
  constructor(private http: HttpClient) {
  }
  getUsers() {
    return this.http.get(`${this.BaseURL}/User/Register`).toPromise();
  }
  async PostUsers(user: any): Promise<Observable<any>> {
    const json = JSON.stringify(user);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(params);
    console.log(json);
    console.log('LLEGÓ');
    return await this.http.post(`${this.BaseURL}/User/Register`, params, { headers });
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
