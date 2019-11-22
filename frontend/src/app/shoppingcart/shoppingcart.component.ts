import { Component, OnInit, Input} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingService } from '../shopping.service';
import { Router } from '@angular/router';

@Component({
  selector: 'content',
  templateUrl: './addToCart.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class comfirmQuantity {
  @Input() product : any;
  quantity  : Number;

  constructor(public activeModal: NgbActiveModal, private shop: ShoppingService) {
    this.quantity = 1;
  }

  addToCart(){
    console.log(this.product);
    this.shop.addToCart(this.product._id, this.product.SalesPersonId, this.product.name, this.product.price, this.quantity, this.product.img);
    console.log(this.shop.getCart());
    this.activeModal.close('Close click');
    /*this.shop.clearCart();
    console.log(this.shop.getCart());*/
  }

}

// Abajo el componente principal

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {
  
  public cart : any;
  public cartelements : any;
  constructor(private router: Router,private modalService: NgbModal, private shop: ShoppingService) { }

  ngOnInit() {
    this.cart = [];
    this.cartelements = [];
    this.updateCart();
  }

  open() {
    const modalRef = this.modalService.open(comfirmQuantity);
    modalRef.componentInstance.product = 'World';
  }

  updateCart(){
    this.cart = this.shop.getCart();
    this.updateCartElements();
  }

  updateCartElements(){
    if (this.cart.length >0){
      this.cartelements = [];

      this.cart.forEach(element => {
        
        element.products.forEach(product => {
          this.cartelements.push({
          SalesPerson : element.SalesPersonId,
          productName : product.productName,
          price : product.price,
          quantity : product.quantity,
          });
          
        });
      });
    }

  }

  limpiar(){
    this.cart = [];
    this.cartelements = [];
    this.shop.clearCart();
  }

  terminarCompra(){
    this.router.navigate(['/order']);
  }
}

@Component({
  selector: 'app-shopelement',
  templateUrl: './shopelement.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class shopElement {
  
  @Input() public element : any;

}


