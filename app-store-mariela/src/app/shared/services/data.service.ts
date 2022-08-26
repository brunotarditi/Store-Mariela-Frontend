import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  isCompleted$ = new EventEmitter<boolean>();
  total$ = new EventEmitter<number>();
  hideAddCart$ = new EventEmitter<number>();
  constructor() { }
}
