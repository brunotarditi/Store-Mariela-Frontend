import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  theme$ = new EventEmitter<string>();
  constructor() { }
}
