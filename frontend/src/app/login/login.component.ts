import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user = {
    email: '',
    password: ''
  };
  constructor(private userService: UsersService, private auth: AuthenticationService) { }

  ngOnInit() {
  }
  public login() {
    this.userService.login(this.user);
  }
}
