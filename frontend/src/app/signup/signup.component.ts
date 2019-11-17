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
      password: ''
    };
  }

  ngOnInit() {

  }
  myFunction(event) {
    console.log(this.show);
    if (event.srcElement.value === 'cliente') {
      this.show = false;
    }
    if (event.srcElement.value === 'vendedor') {
      this.show = true;
    }
  }




  saveData(form: NgForm): void {


    console.log(this.usuarios);

    this.uservice.PostUsers(this.usuarios);
  }

}
