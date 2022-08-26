import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '@data/models/product';
import { MessageService } from '@data/services/message.service';
import { ProductService } from '@data/services/product.service';
import { DataService } from '@shared/services/data.service';

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
  counts: any = [];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  constructor(
    private productService: ProductService, 
    private messageService: MessageService,
    private dataService: DataService,
    ) {
    this.displayedColumns = ['name', 'price', 'current', 'actions']
  }

  ngOnInit(): void {
    this.getProducts();
    console.log(this.counts);
    this.dataService.hideAddCart$.subscribe((data) => {
      console.log(data)
      this.counts[data].addCart = true;
    });
  }

  addToCart(product: Product, index: number):void{
    this.dataService.isCompleted$.emit(true);
    const data = {
      product: product,
      count: this.counts[index],
      index: index
    }
    this.messageService.sendMessage(data);
    this.counts[index].addCart = false;
  }

  searchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator)
      this.dataSource.paginator.firstPage();
  }

  getProducts(): void {
    this.productService.getProductWithStock().subscribe(data => {
      for (const obj of data.Products) {
        let count = {
          quantityItem : 0,
          addCart: false
        }
        this.counts.push(count);
    }
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

  countIncrement(index:any, products: any){
    this.counts[index].addCart = true;
    if (products.stockControl.current > this.counts[index].quantityItem) {
      this.counts[index].quantityItem++;
    }
  }

  countDecrement(index:any){
    this.counts[index].quantityItem < 1 ? 0 : this.counts[index].quantityItem--;
    this.counts[index].quantityItem < 1 ? this.counts[index].addCart = false : this.counts[index].addCart = true;
  }

}
