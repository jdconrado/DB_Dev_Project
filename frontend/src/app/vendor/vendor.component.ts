import { Component, OnInit } from '@angular/core';
import { USUARIOS } from '../users';
import { FOTOS } from '../vendor/fotos';
import { UsersService } from '../users.service';
@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  usuarios = USUARIOS;
  fotos = FOTOS;
  usuario: any;
  constructor(private userService: UsersService) {
    this.usuario = [];
  }
  ngOnInit() {
    this.update();
  }
  update() {
    this.usuario = this.userService.getAllVendors();
    console.log(this.usuario);
  }
}
