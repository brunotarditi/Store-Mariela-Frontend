import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from '@data/services/message.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems = [];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {}

  getItem():void{
    this.messageService.getMessage().subscribe((product) => {
      
    });
  }

}
