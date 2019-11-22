import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  sw: any;
  constructor(private head: AuthenticationService) {
    this.sw = this.head.isTokenValid();
    console.log(this.sw);

  }

  ngOnInit() {
    this.sw = this.head.isTokenValid();
    console.log(this.sw);
  }

}

