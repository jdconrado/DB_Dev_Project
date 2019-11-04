import { Component, OnInit } from '@angular/core';
import { USUARIOS } from '../users';
import { FOTOS } from '../vendor/fotos';
@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  usuarios = USUARIOS;
  fotos = FOTOS;
  constructor() { }

  ngOnInit() {
  }

}
