import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '@data/models/category';
import { RequestMapping } from '@data/utils/constants/request';
import { Observable } from 'rxjs';
import { ApiStoreMariela } from './api-store-mariela';


@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ApiStoreMariela {

  constructor(http: HttpClient) {
    super(http);
  }

  /**
 * 
 * @returns all Categories
 */
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl + RequestMapping.CATEGORY + '/all', { headers: this.header });
  }

  /**
  * 
  * @param category 
  * @returns save one category
  */
  saveCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl + RequestMapping.CATEGORY + '/save', category, { headers: this.header });
  }

  /**
   * 
   * @param id 
   * @param category 
   * @returns edit one category
   */
  editCategory(id:number, category: Category): Observable<Category> {
    return this.http.put<Category>(this.apiUrl + RequestMapping.CATEGORY + '/' + id, category, { headers: this.header });
  }

  /**
  * 
  * @param id
  * @returns delete one category
  */
  deleteCategory(id:number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + RequestMapping.CATEGORY + '/delete/' + id, { headers: this.header });
  }

  /**
 * 
 * @returns all Categories
 */
  getAllCategoriesEnabled(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl + RequestMapping.CATEGORY + '/allEnabled', { headers: this.header });
  }

  /**
   * 
   * @param id 
   * @returns One category
   */
  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(this.apiUrl + RequestMapping.CATEGORY + '/' + id, { headers: this.header });
  }

}
