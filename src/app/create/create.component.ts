import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {  
  productForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
    quantity: new FormControl()
}); 

  ngOnInit() {
      this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      quantity: [''],    
    })
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public productService: ProductService,
    private route: ActivatedRoute
  ){ }

  // On submit, create that new record to db via api
  submitForm() {
    this.productService.create(this.productForm.value).subscribe(res => {
      console.log('Product created!');
      this.router.navigateByUrl('/product/home/');
  })
}

}
