import { Injectable } from '@angular/core';
import { HistoricalPurchase } from '@data/models/historical-purchase';
import { Observable } from 'rxjs';
import { ApiStoreMariela } from './api-store-mariela';

@Injectable({
  providedIn: 'root'
})
export class HistoricalPurchaseService extends ApiStoreMariela {

}
