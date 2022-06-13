import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-save-product',
  templateUrl: './save-product.component.html',
  styleUrls: ['./save-product.component.scss']
})
export class SaveProductComponent implements OnInit {
  productForm = new FormGroup({
    name : new FormControl('', Validators.required),
    brandId : new FormControl(''),
    categoryId : new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }

  postForm(form: Product):void{
    console.log(form);
  }

}
