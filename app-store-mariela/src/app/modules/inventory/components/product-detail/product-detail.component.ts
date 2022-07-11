import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoricalPurchase } from '@data/models/historical-purchase';
import { Product } from '@data/models/product';
import { StockControl } from '@data/models/stock-control';
import { ProductService } from '@data/services/product.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  text = 'Detalle del producto';
  displayedColumns: string[];
  product: Product;
  stock: StockControl;
  dataSource: MatTableDataSource<HistoricalPurchase>;
  hasDetail: boolean = false;
  id: number;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.displayedColumns = ['id', 'quantity', 'costPrice'];
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getProductWithStockAndPurchases(this.id);
  }

  getProductWithStockAndPurchases(id: number) {
    this.productService.getProductWithStockAndPurchases(id).subscribe(data => {
      console.log(data.Stock instanceof Object);
      if (data.Stock instanceof Object) {
        this.hasDetail = true;
        this.product = data.Product;
        this.dataSource = new MatTableDataSource<HistoricalPurchase>(data.Purchases);
        this.stock = data.Stock;
      }else{
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

  
  goToBack(){
    this.router.navigate(['/dashboard/inventory']);
  }

}
