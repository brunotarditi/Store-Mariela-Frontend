import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '@data/models/category';
import { RequestMapping } from '@data/utils/request';
import { Observable } from 'rxjs';
import { ApiStoreMariela } from './api-store-mariela';


@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ApiStoreMariela{

  constructor(http: HttpClient){
    super(http);
  }
  /**
 * 
 * @returns all Categories
 */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl + RequestMapping.CATEGORY + '/all', { headers: this.header });
  }

}
