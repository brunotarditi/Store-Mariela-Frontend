import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = environment.productsEndpoint;
  private header: HttpHeaders = new HttpHeaders().set('Content-type', 'application/json');

  constructor(private http: HttpClient) { }

  getProductWithStockAndPurchases(id:number): Observable<Product[]>{
    return this.http.get<Product[]>(this.productUrl + '/withStocksAndPurchases/' + id, {headers: this.header});
  
  }

  saveProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(this.productUrl, product, {headers: this.header});
  }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.productUrl + '/all', {headers: this.header});
  }
}
