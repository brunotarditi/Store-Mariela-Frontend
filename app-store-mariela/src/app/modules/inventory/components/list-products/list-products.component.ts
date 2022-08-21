import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '@data/models/product';
import { ProductService } from '@data/services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormStockComponent } from '../dialog-form-stock/dialog-form-stock.component';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  text = 'Inventario de mis productos';
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns: string[];
  dataSource: MatTableDataSource<Product>;

  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(
    private productService: ProductService, 
    private router: Router, 
    public dialog: MatDialog) {
    this.displayedColumns = ['id', 'name', 'price', 'actions']
    
  }

  ngOnInit(): void {
    this.getProducts();
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
      this.dataSource.filterPredicate = (data: any,  filter: string) => {
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

  addProduct(): void {
    this.router.navigate(['/dashboard/inventory/save']);
  }

  goToDetail(index: number) {
    this.router.navigate(['/dashboard/inventory/detail/' + index]);
  }

  editProduct(index: number) {
    this.router.navigate(['/dashboard/inventory/save/' + index]);
  }

  goToDialogForm(index: number){
    this.dialog.open(DialogFormStockComponent, {
      data: {
        id: index 
      }
    });
  }

  onDelete(id:number){
    this.productService.deleteProduct(id).subscribe(data => {
      console.log(data)
    },
    err => {
      console.log(err)
    })
  }

}
