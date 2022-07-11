import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Brand } from '@data/models/brand';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  brandForm = new FormGroup({
    names: new FormArray([
      new FormControl('')
    ])
  });
  constructor() { }

  ngOnInit(): void { }

  postForm(form: Brand) {
    console.log(form)
  }

  get brands() {
    return this.brandForm.get('names') as FormArray
  }

  addField() {
    this.brands.push(new FormControl(''))
  }

}
