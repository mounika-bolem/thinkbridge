import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductModel } from '../services/productModel';

@Component({
  selector: 'app-create',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})

export class UpdateComponent implements OnInit {  
  productid : number;
  productForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
    quantity: new FormControl(),
    addlInfo: new FormControl()
}); 

  // On init, get the product from db via api and display that in update html page.
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = +params['id']; // (+) converts string 'id' to a number
      this.productid = id;
      this.productService.getById(id).subscribe((data: ProductModel)=>{
        this.productForm = this.fb.group({
          name: data.name,
          description: data.description,
          price: data.price,
          quantity: data.quantity,  
          addlInfo: data.addlInfo,
          id: data.id  
        })      
      })
    });
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public productService: ProductService,
    private route: ActivatedRoute
  ){ 
    this.productid = 0;
  }

  // update the product to db via api
  submitForm() {
    this.productService.update(this.productid, this.productForm.value).subscribe(res => {
      console.log('Product created!');
      this.router.navigateByUrl('/product/home/');
  })
}

}
