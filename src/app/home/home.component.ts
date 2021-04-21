import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductModel } from '../services/productModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: ProductModel[] = [];

  constructor(public productService: ProductService) { }

  // On init, retrieve all the products from db via calling api and display in the home page.
  ngOnInit(): void {
      this.productService.getAll().subscribe((data: ProductModel[])=>{
      this.products = data;
    }) 
  }

}
