import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartComponent } from '../cart/cart.component';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-steps-process',
  templateUrl: './steps-process.component.html',
  styleUrls: ['./steps-process.component.scss']
})
export class StepsProcessComponent implements OnInit, AfterViewInit {

  form1: FormGroup;

  @ViewChild('stepOne') stepOneComponent: CartComponent;
  @ViewChild('stepTwo') stepTwoComponent: PaymentComponent;
  constructor(private cdr: ChangeDetectorRef) { }
  
  ngOnInit(): void { }
  
  ngAfterViewInit(): void {
    this.form1 = this.stepTwoComponent.frmStepTwo;
    this.cdr.detectChanges();
  }
}
