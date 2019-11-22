import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private imgEndpoint  = 'http://localhost:8080/IMAGES';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor(private http: HttpClient) { }

  getImage(id: String){
    return this.http.get(`${this.imgEndpoint}/fetch/${id}`, this.httpOptions);
  }

}
