import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from '@data/services/product.service';
import { DialogData } from '@data/utils/interfaces/dialog-data';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dialog-form-stock',
  templateUrl: './dialog-form-stock.component.html',
  styleUrls: ['./dialog-form-stock.component.scss']
})
export class DialogFormStockComponent implements OnInit {
  id: number;
  purchaseStockForm = new FormGroup({
    quantity: new FormControl('', Validators.required),
    costPrice: new FormControl('', Validators.required),
    percent: new FormControl(50, Validators.required),
    hasIva: new FormControl(true, Validators.required),
    minimum: new FormControl(1, Validators.required),
  });
  constructor(
    public dialogRef: MatDialogRef<DialogFormStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.productService.savePurchase(this.purchaseStockForm.value, this.data.id).subscribe(data => {
      this.dialogRef.close();
      Swal.fire({
        icon: 'success',
        title: `Se guardó una nueva compra para este producto, ahora tienes ${data.quantity} nuevos.`,
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/dashboard/inventory'])
        }
      });
    },
      err => {
        this.dialogRef.close();
        Swal.fire({
          icon: 'error',
          title: 'No pudo realizarse la compra',
          confirmButtonText: 'Oops'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/dashboard/inventory'])
          }
        });
      });
  }

}
