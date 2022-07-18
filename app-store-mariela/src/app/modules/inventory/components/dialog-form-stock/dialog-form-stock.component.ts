import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData{
  id: number;
}

@Component({
  selector: 'app-dialog-form-stock',
  templateUrl: './dialog-form-stock.component.html',
  styleUrls: ['./dialog-form-stock.component.scss']
})
export class DialogFormStockComponent implements OnInit {
  id: number;
  purchaseStockForm = new FormGroup({
    quantity : new FormControl('', Validators.required),
    costPrice : new FormControl('', Validators.required),
    percent : new FormControl(''),
  });
  constructor(
    public dialogRef: MatDialogRef<DialogFormStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

  ngOnInit(): void {
    console.log(this.data.id)
  }

  onSubmit(){
    console.log(this.purchaseStockForm.value)
  }

  onlyNumber(event:any){
    console.log(event)
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false
    }
    return true;
  }

}
