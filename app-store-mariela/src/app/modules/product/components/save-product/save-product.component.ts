import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from '@data/models/brand';
import { Category } from '@data/models/category';
import { Product } from '@data/models/product';
import { BrandService } from '@data/services/brand.service';
import { CategoryService } from '@data/services/category.service';
import { ProductService } from '@data/services/product.service';

@Component({
  selector: 'app-save-product',
  templateUrl: './save-product.component.html',
  styleUrls: ['./save-product.component.scss']
})
export class SaveProductComponent implements OnInit {
  text = 'Nuevo producto'; 
  brands: Brand[];
  categories: Category[];
  id: number;

  productForm = new FormGroup({
    name : new FormControl('', Validators.required),
    brandId : new FormControl(''),
    categoryId : new FormControl(''),
  });

  constructor(
    private productService: ProductService,
    private brandService: BrandService, 
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if(this.id > 0){
      this.getProductById(this.id);
    }
    this.getBrands();
    this.getCategories();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(data => this.brands = data);
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(data => this.categories = data);
  }

  /**TODO: implements */
  getProductById(id: number): void{
  }

  postForm(form: Product):void{
    if (this.id > 0) {
      this.productService.editProduct(form, this.id).subscribe(data => {
        console.log(data);
        this.router.navigate(['/product']);
      });
    }else{
      this.productService.saveProduct(form).subscribe(data => {
        console.log(data);
        this.router.navigate(['/product']);
      });
    }
  }

}
