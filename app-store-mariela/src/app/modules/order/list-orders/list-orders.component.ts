import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { Order } from '@data/models/order';
import { OrderService } from '@data/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit {

  text = 'Pedidos';
  @ViewChild(MatAccordion) accordion: MatAccordion;
  order: Order;
  orders: any;

  constructor(
    private orderService: OrderService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getAllOrdersEnabledWithDetails().subscribe(data => {
      console.log(data.Orders)
      this.orders = data.Orders
    },
      err => {
        console.log(err)
      },
    );
  }

  addOrder(): void {
    let order: Order = { id: 0, total: 0, status: 0, creatAt: new Date(), updateAt: new Date(), isDelete: false, paymentMethod: "" }
    this.orderService.saveOrder(order).subscribe(data => {
      console.log(data)
      this.getOrders();
    });
    
  }

  addDetail(index: number) {
    this.router.navigate(['/dashboard/orders/new/' + index ]);
  }

  onDelete(id: number) {
    this.orderService.deleteProduct(id).subscribe(data => {
      console.log(data);
      Swal.fire({
        icon: 'success',
        title: data.message,
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    },
      err => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: err.error.message,
          confirmButtonText: 'Volver'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/dashboard/orders'])
          }
        });
      })
  }

}
