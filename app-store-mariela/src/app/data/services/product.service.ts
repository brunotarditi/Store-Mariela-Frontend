import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '@data/models/product';
import { ApiStoreMariela } from './api-store-mariela';
import { HistoricalPurchase } from '@data/models/historical-purchase';
import { RequestMapping } from '@data/utils/constants/request';
import { HttpClient } from '@angular/common/http';
import { PurchaseStock } from '@data/models/purchase-stock';

const REQUEST: string = 'products';

@Injectable({
  providedIn: 'root'
})

export class ProductService extends ApiStoreMariela {

  constructor(http: HttpClient) {
    super(http);
  }

  /**
   * 
   * @returns all products
   */
  getProducts(): Observable<Product[]> {
    const response = { error: false, msg: '', data: null };
    return this.http.get<Product[]>(this.apiUrl + RequestMapping.PRODUCT + '/all', { headers: this.header })
  }

  /**
   * 
   * @param product 
   * @returns save one product
   */
  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl + RequestMapping.PRODUCT + '/save', product, { headers: this.header });
  }

  /**
   * 
   * @param product 
   * @returns edit one product
   */
  editProduct(product: Product, id: number): Observable<Product> {
    return this.http.put<Product>(this.apiUrl + RequestMapping.PRODUCT + '/' + id, product, { headers: this.header });
  }

  /**
   * 
   * @param id 
   * @returns One product
   */
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.apiUrl + RequestMapping.PRODUCT + '/' + id, { headers: this.header });
  }

  /**
   * 
   * @param id product 
   * @returns Product with list of purchases and stock
   */
  getProductWithStockAndPurchases(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + RequestMapping.PRODUCT + '/withStockAndPurchases/' + id, { headers: this.header });
  }

  /**
   * 
   * @param purchase 
   * @returns save one historical purchase
   */
  savePurchase(purchase: PurchaseStock, id: number): Observable<PurchaseStock> {
    return this.http.post<PurchaseStock>(this.apiUrl + RequestMapping.PRODUCT + '/savePurchase/' + id, purchase, { headers: this.header });
  }

  /**
   * 
   * @returns All product and stock is present
   */
  getProductWithStock(): Observable<any> {
    return this.http.get<any>(this.apiUrl + RequestMapping.PRODUCT + '/withStock', { headers: this.header });
  }

}
