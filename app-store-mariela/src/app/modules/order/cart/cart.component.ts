import { Component, OnInit } from '@angular/core';
import { Product } from '@data/models/product';
import { MessageService } from '@data/services/message.service';
import { CartItemModel } from '@data/utils/constants/cart-item-model';
import { DataService } from '@shared/services/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItemModel[] = [];
  total: number;
  constructor(private messageService: MessageService, private dataService: DataService) {
    this.total = 0;
  }

  ngOnInit(): void {
    this.getItem();
    this.total = this.getTotal();
  }


  getItem(): void {
    this.messageService.getMessage().subscribe((product: Product) => {
      let exist = false;
      this.cartItems.forEach((item) => {
        if (item.productId === product.id) {
          exist = true;
          item.productQuantity++;
        }
      });
      if (!exist) {
        const cartItem = new CartItemModel(product);
        this.cartItems.push(cartItem);
      }
    });
  }

  getTotal(): number {
    let total = 0;
    this.cartItems.forEach((item) => {
      total += item.productQuantity * item.productPrice;
    });
    this.dataService.total$.emit(total);
    return total;
  }

  emptyCart(): void {
    this.cartItems = [];
    this.total = 0;
    this.dataService.isCompleted$.emit(false);
  }

  deleteItem(index: number): void{
    
    if (this.cartItems[index].productQuantity > 1) {
      this.cartItems[index].productQuantity--;
    }else{
      this.cartItems.splice(index, 1);
      if (this.cartItems.length < 1) {
        this.dataService.isCompleted$.emit(false);
      }
    }
    this.total = this.getTotal();
  }

}
