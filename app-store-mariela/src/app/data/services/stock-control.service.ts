import { Injectable } from '@angular/core';
import { StockControl } from '@data/models/stock-control';
import { Observable } from 'rxjs';
import { ApiStoreMariela } from './api-store-mariela';

@Injectable({
  providedIn: 'root'
})
export class StockControlService extends ApiStoreMariela {

}
