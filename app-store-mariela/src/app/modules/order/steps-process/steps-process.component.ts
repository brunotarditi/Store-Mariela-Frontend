import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '@shared/services/data.service';
import { StorageService } from '@shared/services/storage.service';
import { CartComponent } from '../cart/cart.component';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-steps-process',
  templateUrl: './steps-process.component.html',
  styleUrls: ['./steps-process.component.scss']
})
export class StepsProcessComponent implements OnInit, AfterViewInit {
  cart: boolean;
  isCompleted: boolean;
  idOrder: number;
  form2: FormGroup;
  @ViewChild('stepOne') stepOneComponent: CartComponent;
  @ViewChild('stepTwo') stepTwoComponent: PaymentComponent;
  
  constructor(
    private cdr: ChangeDetectorRef, 
    private dataService: DataService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService) { }

  ngOnInit(): void {
    this.idOrder = this.activatedRoute.snapshot.params['id'];
    this.dataService.isCompleted$.subscribe(value => {
      this.isCompleted = value
    })
  }

  ngAfterViewInit(): void {
    this.form2 = this.stepTwoComponent.frmStepTwo;
    this.cdr.detectChanges();
  }

  returnOrders(stepper: MatStepper){
    stepper.reset();
    this.storageService.clear('cart' + this.idOrder);
    this.stepOneComponent.cartItems = [];
    this.stepOneComponent.total = 0;
    this.stepTwoComponent.frmStepTwo.controls.payMethod.setValue('');
    this.isCompleted = false;
    this.router.navigate(['/dashboard/orders']);
  }

}
