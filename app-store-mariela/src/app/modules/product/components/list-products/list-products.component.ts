import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '@data/models/product';
import { ProductService } from '@data/services/product.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  text = 'Mis productos'; 
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  displayedColumns: string[];
  dataSource: MatTableDataSource<Product>;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  resultsLength = 0;
  isLoadingResults = true;

  constructor(private productService: ProductService, private router: Router) {
    this.displayedColumns = ['id', 'name', 'price']
  }

  ngOnInit(): void {
    this.getProducts();
  }

  searchFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator)
      this.dataSource.paginator.firstPage();
  }


  getProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.isLoadingResults = true;
      this.resultsLength = data.length;
      this.dataSource = new MatTableDataSource<Product>(data);
      if (this.dataSource) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    },
    err => {
      console.log(err)
    });
  }

  addProduct(): void {
    this.router.navigate(['/product/save']);
  }
}
