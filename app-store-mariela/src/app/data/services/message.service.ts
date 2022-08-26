import { Injectable } from '@angular/core';
import { Product } from '@data/models/product';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message = new Subject();

  constructor() { }

  sendMessage(data:any): void{
    this.message.next(data);
  }

  getMessage(): Observable<any>{
    return this.message.asObservable();
  }
}
