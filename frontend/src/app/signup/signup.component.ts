import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  show = null;
  us: any;
  usuarios: any;
  pw: any;
  error: any;
  errorpw = false;
  errortipo = false;
  constructor(private uservice: UsersService) {
    this.error = false;
    this.us = [];
    this.pw = '';
    this.usuarios = {
      name: '',
      lastname: '',
      phone: '',
      email: '',
      DateOfBirth: '',
      password: '',
      cpassword: '',
      description: '',
      vendor: null
    };
  }

  ngOnInit() {

  }
  myFunction(event) {
    console.log(this.show);
    if (event.srcElement.value === 'cliente') {
      this.show = false;
      this.usuarios.vendor = false;
    }
    if (event.srcElement.value === 'vendedor') {
      this.show = true;
      this.usuarios.vendor = true;
    }
  }

  verificar(): void {
    if (this.usuarios.password !== this.usuarios.cpassword) {
      this.errorpw = true;
    } else {
      this.errorpw = false;
    }
  }

  saveData(form: NgForm): void {
    // falta verificar que si hayan puesto todos los datos
    console.log(this.usuarios);
    if (this.usuarios.vendor === null) {
      this.errortipo = true;
    } else {
      this.errortipo = false;
    }
    if (form.valid && !this.errortipo && !this.errorpw) {
      this.uservice.registerUser(this.usuarios);
    } else {
      console.log("Form no valido");
      
    }
  }
  
}
