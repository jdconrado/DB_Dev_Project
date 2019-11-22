import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token: string;
  sw: any;
  constructor(private http: HttpClient, private router: Router) {
    this.token = '';
    if (this.sw) {
      console.log(this.isTokenValid());
    }
  }

  public saveToken(token: string): void {
    localStorage.setItem('UComm-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('UComm-token');
    }
    return this.token;
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('UComm-token');
    this.router.navigate(['/login']);
    this.sw = false;
  }

  public isTokenValid(): boolean { // Checa si el token aún no expira
    let payload;
    if (this.getToken) {
      payload = this.token.split('.')[1];
      payload = window.atob(payload);
      payload = JSON.parse(payload);

      return payload.exp > Date.now() / 1000;
    } else {
      // No hay ninguna sesión iniciada.
      this.router.navigate(['/login']);
      return false;
    }

  }
  public getUserID() {
    if (this.token !== '') {
      let payload;
      if (this.getToken) {
        payload = this.token.split('.')[1];
        payload = window.atob(payload);
        payload = JSON.parse(payload);

        return payload._id;
      } else {
        console.log("No existe")
      }
      return null;
    }
  }
}
