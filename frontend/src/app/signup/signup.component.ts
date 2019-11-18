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
  constructor(private uservice: UsersService) {
    this.us = [];
    this.pw = '';
    this.usuarios = {
      name: '',
      lastname: '',
      phone: '',
      email: '',
      DateOfBirth: '',
      password: '',
      cpassword:'',
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




  saveData(form: NgForm): void {

    // falta verificar que si hayan puesto todos los datos
    console.log(this.usuarios);
    if(this.usuarios.password === this.usuarios.cpassword){
      this.uservice.registerUser(this.usuarios);
    }else{
      console.log('Las constraseñas no coinciden')
    }
    
  }

}
