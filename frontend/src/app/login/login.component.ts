import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user = {
    email : '',
    password: ''
  };
  constructor(private userService : UsersService) { }

  ngOnInit() {
  }
  public login(){
    this.userService.login(this.user);
  }
}
