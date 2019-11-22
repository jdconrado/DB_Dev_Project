import { Component, OnInit, Input } from '@angular/core';
import { ImagesService } from 'src/app/images.service';
import { ShoppingService } from 'src/app/shopping.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {comfirmQuantity} from '../../shoppingcart/shoppingcart.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @Input() product : any; 
  img : String;
  quantity = 1;
  constructor(private modalService: NgbModal, private imgService: ImagesService, private shop : ShoppingService) { }

  ngOnInit() {

    this.getImage();
  }
  
  getImage(){
    if(this.product.imageId){
      this.imgService.getImage(this.product.imageId).subscribe((data)=>{
        if((data["result"] as String).includes("Successful")){
          this.img="http://localhost:8080/"+data["data"].imgUrl;

        }
      });
    }
  }

  addToCart(){
    const modalRef = this.modalService.open(comfirmQuantity);
    this.product.img = this.img;
    console.log(this.product);
    modalRef.componentInstance.product = this.product;
  }

}
