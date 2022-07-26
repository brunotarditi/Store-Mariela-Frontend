import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoricalPurchase } from '@data/models/historical-purchase';
import { Product } from '@data/models/product';
import { StockControl } from '@data/models/stock-control';
import { ProductService } from '@data/services/product.service';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DialogFormStockComponent } from '../dialog-form-stock/dialog-form-stock.component';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  text = 'Detalle del stock del producto';
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  displayedColumns: string[];
  product: Product;
  stock: StockControl;
  dataSource: MatTableDataSource<HistoricalPurchase>;
  hasDetail: boolean = false;
  id: number;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.displayedColumns = ['id', 'quantity', 'costPrice', 'createAt'];
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getProductWithStockAndPurchases(this.id);
  }

  getProductWithStockAndPurchases(id: number): void {
    this.productService.getProductWithStockAndPurchases(id).subscribe(data => {
      console.log(data)
      if (data.Stock instanceof Object) {
        this.hasDetail = true;
        this.product = data.Product;
        this.dataSource = new MatTableDataSource<HistoricalPurchase>(data.Purchases);
        if (this.dataSource) {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        this.stock = data.Stock;
      } else {
        Swal.fire({
          icon: 'question',
          title: 'Este producto no registra compras ni stock.',
          confirmButtonText: 'Volver'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/dashboard/inventory'])
          }
        });
      }
    });
  }


  goToBack(): void {
    this.router.navigate(['/dashboard/inventory']);
  }

  openDialog(index: number): void {
    this.dialog.open(DialogFormStockComponent, {
      data: {
        id: index
      }
    });
  }

}
