import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private prdtEndpoint  = 'localhost:8080/PRODUCTS/';

 

  constructor() { }
}
