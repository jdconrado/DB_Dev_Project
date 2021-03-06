import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './user';
import { throwError, Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  error: any;
  private BaseURL = 'http://localhost:8080';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService, private toastr: ToastrService) {
    this.error = false;
  }


  public registerUser(user: any) {

    //console.log('LLEGÓ');
    this.http.post(`${this.BaseURL}/USERS/register`, user, this.httpOptions).subscribe(
      (data) => {
        console.log(data);
        if ((data["result"] as string).includes("Successful")) {
          this.router.navigate(['/login']);
        } else {
          // Mostrar alerta de error
        }
      }
    );
  }

  public login(user: any) {
    this.http.post(`${this.BaseURL}/USERS/login`, user, this.httpOptions).subscribe((data) => {
      console.log(data);
      if ((data["result"] as string).includes("Successful")) {
        this.auth.saveToken(data['token']);
        this.router.navigate(['/home']);
        this.error = false;
      } else {
        console.log('Hubo un error mano');
        this.error = true;
        // Mostrar alerta de error de login no correcto
      }
      this.auth.sw = this.auth.isTokenValid();
    });
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

  public getAllVendors(): any {
    let res = [];
    this.http.get(`${this.BaseURL}/USERS/VENDORS/fetch`, this.httpOptions).subscribe((data) => {
      data["data"].forEach(vendor => {
        this.http.get(`${this.BaseURL}/USERS/info/${vendor["userId"]}`, this.httpOptions).subscribe((userData) => {
          res.push({
            name: userData["data"]["name"],
            lastName: userData["data"]["lastname"],
            vendorDetails: vendor
          });
        });
      });
    });
    return res;
  }

  public getVendors(id: any): any {
    let res = [];
    this.http.get(`${this.BaseURL}/USERS/VENDORS/fetch`, this.httpOptions).subscribe((data) => {
      data["data"].forEach(vendor => {
        if (vendor["userId"] === id) {
          this.http.get(`${this.BaseURL}/USERS/info/${id}`, this.httpOptions).subscribe((userData) => {
            res.push({
              name: userData["data"]["name"],
              lastName: userData["data"]["lastname"],
              vendorDetails: vendor
            });
          });
        }
      });
    });
    return res;
  }


  public getClient(id: any): any {
    let res = [];
      this.http.get(`${this.BaseURL}/USERS/CLIENTS/giveid/${id}`, this.httpOptions).subscribe((userData) => {
        res.push({
          id: userData["id"]
        });
      });
    
      console.log(res);
    return res;
  }


  public getVendorId(id: any): any {
    let res = [];
    this.http.get(`${this.BaseURL}/USERS/vendors/giveid/${id}`, this.httpOptions).subscribe((userData) => {
      res.push(userData["data"]);
    });
    console.log(res);
    return res;
  }

  public createProdct(prdct: any) {
    this.http.post(`${this.BaseURL}/PRODUCTS/create`, prdct, this.httpOptions).subscribe((data) => {
      if ((data["result"] as String).includes("Successful")) {
        this.toastr.success("Producto creado de manera exitosa");
      }
    });
  }

  public getProductsForVendor(id: String): Observable<any> {
    return this.http.get(`${this.BaseURL}/PRODUCTS/getprodcts/${id}`, this.httpOptions);
  }

  public getUser(id: any): any {
    let res = [];
    this.http.get(`${this.BaseURL}/USERS/info/${id}`, this.httpOptions).subscribe((userData) => {
      res.push(userData["data"]);
    });
    return res;
  }

  public updateUser(user: any, id: String) {
    console.log(user);
    this.http.put(`${this.BaseURL}/USERS/modify/${id}`, user, this.httpOptions).subscribe((data) => {
      if ((data["result"] as String).includes("Successful")) {
        this.toastr.success("Actualizado de manera exitosas.");
      }
    });
  }

}
