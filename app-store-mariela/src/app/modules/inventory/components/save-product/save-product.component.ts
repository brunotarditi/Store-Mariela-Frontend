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
  product: Product; 
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
    this.getBrands();
    this.getCategories();
    this.id = this.activatedRoute.snapshot.params['id'];
    if(this.id > 0){
      this.getProductById(this.id);
    }
  }

  getBrands(){
    this.brandService.getAllBrandsEnabled().subscribe(data => this.brands = data);
  }

  getCategories(){
    this.categoryService.getAllCategoriesEnabled().subscribe(data => this.categories = data);
  }

  getProductById(id: number): void{
    this.productService.getProduct(id).subscribe(data => {
      this.productForm.setValue({
        'name': data.name,
        'brandId': data.brandId,
        'categoryId': data.categoryId
      })
    });
  }

  onSubmit(productForm: Product):void{
    if (this.id > 0) {
      this.productService.editProduct(productForm, this.id).subscribe(data => {
        this.router.navigate(['/inventory']);
      });
    }else{
      this.productService.saveProduct(productForm).subscribe(data => {
        this.router.navigate(['/inventory']);
      });
    }
  }

}
