import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  show = false;
  us: any;
  constructor(private uservice: UsersService) {
    this.us = [];

  }

  ngOnInit() {

  }
  myFunction(event) {
    console.log(event);
    console.log(event.srcElement.addEventListener.name);
    console.log(event.srcElement.value);
    if (event.srcElement.value === 'cliente') {
      this.show = false;
    }
    if (event.srcElement.value === 'vendedor') {
      this.show = true;
    }
  }
  saveData(name, lastname, phone, email, DateOfBirth, password, inputConfirmPassword, inputDesc): void {
    this.us = { name, lastname, phone, email, DateOfBirth, password, inputConfirmPassword, inputDesc };
    this.uservice.PostUsers(this.us);
  }

}
