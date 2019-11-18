import { Component, OnInit } from '@angular/core';
import { Productos } from '../ProductosPruebaOrder';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  productos = Productos;
  suma = 0;
  constructor() {
    for (let index = 0; index < this.productos.length; index++) {
      this.productos[index].precioTotal = this.productos[index].precio * this.productos[index].cantidad;
      this.suma = this.productos[index].precioTotal + this.suma;
    }
  }
  ngOnInit() {
  }

}
