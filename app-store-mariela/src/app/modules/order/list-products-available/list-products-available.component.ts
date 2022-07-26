import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '@data/models/product';
import { MessageService } from '@data/services/message.service';
import { ProductService } from '@data/services/product.service';

@Component({
  selector: 'app-list-products-available',
  templateUrl: './list-products-available.component.html',
  styleUrls: ['./list-products-available.component.scss']
})
export class ListProductsAvailableComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns: string[];
  dataSource: MatTableDataSource<Product>;

  pageSizeOptions: number[] = [5, 10, 25, 100];
  constructor(
    private productService: ProductService, 
    private messageService: MessageService
    ) {
    this.displayedColumns = ['id', 'name', 'price', 'actions']
  }

  ngOnInit(): void {
    this.getProducts();
  }

  addToCart(product: Product):void{
    console.log(product);
    this.messageService.sendMessage(product);
  }

  searchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator)
      this.dataSource.paginator.firstPage();
  }

  getProducts(): void {
    this.productService.getProductWithStock().subscribe(data => {
      this.dataSource = new MatTableDataSource<Product>(data.Products);
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        return data.name.trim().toLowerCase().indexOf(filter) !== -1
      }
      if (this.dataSource) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    },
      err => {
        console.log(err)
      },
    );
  }

}
