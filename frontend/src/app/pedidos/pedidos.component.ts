import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  array: any;
  products: any;
  constructor() {
    this.array = [{ estado: 'En espera', cliente: 'Juan', phonec: '1234' },
    { estado: 'En espera', cliente: 'Juan2', phonec: '12345' },
    { estado: 'Entregado', cliente: 'Juan3', phonec: '12346' }];
    this.products = [{nombre: 'Papita', precio: 5000, cantidad: 3}, {nombre: 'Dedito', precio: 2000, cantidad: 1}];
  }

  ngOnInit() {
  }

}
