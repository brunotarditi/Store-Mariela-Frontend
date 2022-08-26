import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute } from '@angular/router';
import { Order } from '@data/models/order';
import { OrderService } from '@data/services/order.service';
import { DataService } from '@shared/services/data.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  payMethods: string[] = ['Efectivo', 'Otro método'];
  moneyBack: number;
  isCash: boolean;
  hereYourMoney: boolean;
  total: number;
  frmStepTwo: FormGroup;
  errMsg: string;
  errMoney: boolean;
  next: boolean;
  idOrder: number;
  order: Order;

  constructor(
    private formBuilder: FormBuilder, 
    private dataService: DataService,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.frmStepTwo = this.formBuilder.group({
      cash: [''],
      payMethod: ['', Validators.required ]
    });
    this.dataService.total$.subscribe(num => {
      this.total = num;
    });
    this.idOrder = this.activatedRoute.snapshot.params['id'];
    this.getOrder();
  }

  capturePaymentMethod(e: MatRadioChange){
    this.isCash = e.value == 'Efectivo' ? true : false;
    this.next = e.value == 'Otro método' ? true : false;
  }

  calculateMoneyBack(){
    let cashQuantity = this.frmStepTwo.get('cash')?.value
    if (cashQuantity < this.total) {
      this.errMoney = true;
      this.hereYourMoney = false;
      this.errMsg = "El importe a cobrar debe ser mayor que el total."
    }else{
      this.next = true;
      this.hereYourMoney = true;
      this.errMoney = false;
      this.moneyBack = cashQuantity - this.total;
    }
  }

  getOrder(){
    this.orderService.getOrder(this.idOrder).subscribe((data) => {
      this.order = data;
      this.order.status = 5;
      this.order.paymentMethod = this.isCash ? 'Efectivo' : 'Otro';
    });
  }

  changeStatus(){
    this.orderService.updateOrder(this.idOrder, this.order).subscribe((data) => {
      console.log(data);
    });
  }

}
