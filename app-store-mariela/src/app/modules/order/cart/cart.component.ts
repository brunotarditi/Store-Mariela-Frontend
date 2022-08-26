import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '@data/models/order';
import { OrderDetail } from '@data/models/order-detail';
import { Product } from '@data/models/product';
import { MessageService } from '@data/services/message.service';
import { OrderDetailService } from '@data/services/order-detail.service';
import { OrderService } from '@data/services/order.service';
import { CartItemModel } from '@data/utils/constants/cart-item-model';
import { DataService } from '@shared/services/data.service';
import { StorageService } from '@shared/services/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItemModel[] = [];
  total: number;
  idOrder: number;
  order: Order;
  constructor(
    private messageService: MessageService,
    private dataService: DataService,
    private orderDetailService: OrderDetailService,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService,
  ) {
    this.total = 0;
  }

  ngOnInit(): void {
    this.idOrder = this.activatedRoute.snapshot.params['id'];
    if (this.storageService.exist('cart' + this.idOrder)) {
      this.cartItems = this.storageService.get('cart' + this.idOrder);
      this.dataService.isCompleted$.emit(true);
    }
    this.getItem();
    this.total = this.getTotal();
    this.getOrder();
  }


  getItem(): void {
    this.messageService.getMessage().subscribe((data: any) => {
        let orderDetail= new OrderDetail(data.count.quantityItem, data.product.price, this.idOrder, data.product.id,);
        this.orderDetailService.addToCart(data.product.id, orderDetail).subscribe((orderDetailBd) => {
          console.log(orderDetail);
          const cartItem = new CartItemModel(data.product, data.count.quantityItem, data.index, orderDetailBd.id);
          this.cartItems.push(cartItem);
          this.total = this.getTotal();
        this.storageService.set('cart' + this.idOrder, this.cartItems);
      });
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

  deleteItem(i: number): void {
    let index = this.cartItems[i].index
    let idOrderDetail = this.cartItems[i].idOrderDetail;
    this.orderDetailService.deleteToCart(idOrderDetail).subscribe((data) => {
      console.log(data);
      this.cartItems.splice(i, 1);
      this.dataService.hideAddCart$.emit(index);
      if (this.cartItems.length < 1) {
        this.dataService.isCompleted$.emit(false);
      }
      this.total = this.getTotal();
    })
  }

  getOrder(){
    this.orderService.getOrder(this.idOrder).subscribe((data) => {
      this.order = data;
      this.order.status = 3;
    });
  }

  changeStatus(){
    this.orderService.updateOrder(this.idOrder, this.order).subscribe((data) => {
      console.log(data);
      
    });
  }
}
