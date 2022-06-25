import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { HistoricalPurchase } from '@data/models/historical-purchase';
import { Product } from '@data/models/product';
import { StockControl } from '@data/models/stock-control';
import { ProductService } from '@data/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  text = 'Detalle';
  displayedColumns: string[];
  product: Product;
  stock: StockControl;
  dataSource: MatTableDataSource<HistoricalPurchase>;
  id: number;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {
    this.displayedColumns = ['id', 'quantity', 'costPrice'];
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getProductWithStockAndPurchases(this.id);
  }

  getProductWithStockAndPurchases(id: number) {
    this.productService.getProductWithStockAndPurchases(id).subscribe(data => {
      console.log(data.Purchases);
      this.dataSource = new MatTableDataSource<HistoricalPurchase>(data.Purchases);
      this.product = data.Product;
      this.stock = data.Stock;
    });
  }

}
