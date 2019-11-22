import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedidos-c',
  templateUrl: './pedidos-c.component.html',
  styleUrls: ['./pedidos-c.component.css']
})
export class PedidosCComponent implements OnInit {

  array: any;
  products: any;
  constructor() {
    this.array = [{ estado: 'En espera', vendedor: 'VJuan', phonec: '1234' },
    { estado: 'En espera', vendedor: 'VJuan2', phonec: '12345' },
    { estado: 'Entregado', vendedor: 'VJuan3', phonec: '12346' }];
    this.products = [{nombre: 'Papita', precio: 5000, cantidad: 3}, {nombre: 'Dedito', precio: 2000, cantidad: 1}];
  }
  ngOnInit() {
  }

}
