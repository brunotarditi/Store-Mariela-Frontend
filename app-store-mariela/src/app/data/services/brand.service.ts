import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '@data/models/brand';
import { RequestMapping } from '@data/utils/constants/request';
import { Observable } from 'rxjs';
import { ApiStoreMariela } from './api-store-mariela';

@Injectable({
  providedIn: 'root'
})
export class BrandService extends ApiStoreMariela {

  constructor(http: HttpClient) {
    super(http);
  }
  /**
 * 
 * @returns all Brands
 */
  getAllBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.apiUrl + RequestMapping.BRAND + '/all', { headers: this.header });
  }

  /**
   * 
   * @param Brand 
   * @returns save one Brand
   */
  saveBrand(Brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(this.apiUrl + RequestMapping.BRAND + "/save", Brand, { headers: this.header });
  }

  /**
   * 
   * @param Brand 
   * @returns save many Brands
   */
  saveManyBrand(Brand: Brand[]): Observable<Brand[]> {
    return this.http.post<Brand[]>(this.apiUrl + RequestMapping.BRAND + "/save/all", Brand, { headers: this.header });
  }

  /**
   * 
   * @param Brand 
   * @returns edit one Brand
   */
  editBrand(Brand: Brand, id: number): Observable<Brand> {
    return this.http.put<Brand>(this.apiUrl + RequestMapping.BRAND + '/' + id, Brand, { headers: this.header });
  }

  /**
 * 
 * @param Brand 
 * @returns Brand with list of products
 */
  getBrandWithProduct(id: number): Observable<any> {
    return this.http.put<any>(this.apiUrl + RequestMapping.BRAND + '/all/' + id, { headers: this.header });
  }
}
