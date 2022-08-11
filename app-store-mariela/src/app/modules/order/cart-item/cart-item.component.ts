import { Component, Input, OnInit } from '@angular/core';
import { CartItemModel } from '@data/utils/constants/cart-item-model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() cartItemModel: CartItemModel;
  constructor() { }

  ngOnInit(): void {
  }

  

}
