import { Component, OnInit } from '@angular/core';
import { Productos } from '../ProductosPruebaOrder';
import { ShoppingService } from '../shopping.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  productos: any;
  suma = 0;
  fila: any;
  info: any;
  constructor(private cart: ShoppingService, private user: UsersService) {

  }
  ngOnInit() {
  }
  public makeorder() {
    this.cart.getCart().forEach(element => {
      this.cart.makeOrder(element);
    });
  }
}
