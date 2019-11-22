import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { BrowserStack } from 'protractor/built/driverProviders';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private cart: any;

  private BaseURL = 'http://localhost:8080';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor(private http: HttpClient, private auth: AuthenticationService, private router: Router, private toastr: ToastrService) { }

  public addToCart(pId: String, spId: String, pName: String, pPrice: Number, pQuantity: Number, img: String) {
    if (this.auth.isTokenValid()) {
      if (localStorage.getItem('UComm-cart') == null) {
        this.cart = [];
        let venta = {
          SalesPersonId: spId,
          products: [{
            productId: pId,
            productImg: img,
            productName: pName,
            price: pPrice,
            quantity: pQuantity
          }]
        };
        this.cart.push(venta);
        localStorage.setItem('UComm-cart', JSON.stringify(this.cart));
      } else {
        this.cart = JSON.parse(localStorage.getItem('UComm-cart'));
        let index = -1;
        for (var i = 0; i < this.cart.length; i++) {
          if (spId == this.cart[i].SalesPersonId) {
            index = i;
            break;
          }
        }

        if (index == -1) {
          let venta = {
            SalesPersonId: spId,
            products: [{
              productId: pId,
              productName: pName,
              price: pPrice,
              quantity: pQuantity
            },]
          };
          this.cart.push(venta);
        } else {
          this.cart[index].products.push(
            {
              productId: pId,
              productName: pName,
              price: pPrice,
              quantity: pQuantity
            }
          );
        }
        localStorage.setItem('UComm-cart', JSON.stringify(this.cart));
      }
      this.toastr.success("Producto añadido al carro.");
    } else {
      this.clearCart();
      this.router.navigate(['/login']);
    }

  }

  public getCart(): any {
    this.cart = JSON.parse(localStorage.getItem('UComm-cart'));
    if (this.cart == null || this.getCart == undefined) {
      return [];
    } else {
      return this.cart;
    }
  }

  public clearCart() {
    this.cart = [];
    localStorage.removeItem('UComm-cart');
    this.toastr.success("Carro borrado.");
  }

  public makeOrder(order: any) {
    this.http.post(`${this.BaseURL}/ORDERS/create`, order, this.httpOptions).subscribe(
      (data)=>{
        if((data['Results'] as String).includes("Successful")){
          this.clearCart();
          this.toastr.success("Compra realizada.");
        }
      }
    );
    console.log("X");
    console.log(order);
    //this.http.post(`${this.BaseURL}`, order, this.httpOptions);
  }

}
