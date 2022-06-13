import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  displayedColumns: string[];
  products: Product[] = [];
  dataSource = new MatTableDataSource(this.products);
  constructor(private productService: ProductService, private router: Router) {
    this.displayedColumns = ['id', 'name', 'price']
  }

  searchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts():void{
    this.productService.getProducts().subscribe(p => this.products = p)
  }

  addProduct(): void{
    this.router.navigate(['/product/save']);
  }
}
