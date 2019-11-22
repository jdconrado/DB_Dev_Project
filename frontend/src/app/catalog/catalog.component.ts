import { Component, OnInit } from '@angular/core';
import { CatalogService } from './catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  Products = [];

  constructor(private ProService:CatalogService) { }

  ngOnInit() {
    this.updateProducts();
  }

updateProducts(){
    this.ProService.getAllProducts().subscribe((data)=>{
      if ((data["result"] as String).includes("Successful")){
        this.Products = data["data"];
      }else{
        //Manejar si no es success

      }
    });
  }

}
