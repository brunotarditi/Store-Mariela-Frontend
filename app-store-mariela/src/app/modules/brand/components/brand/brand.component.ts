import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Brand } from '@data/models/brand';
import { BrandService } from '@data/services/brand.service';
@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {


  text: string = 'Marcas';
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns: string[];
  dataSource: MatTableDataSource<Brand>;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  brandForm = new FormGroup({
    names: new FormArray([
      new FormControl('', Validators.required)
    ])
  });
  constructor(private brandService: BrandService) {
    this.displayedColumns = ['id', 'name', 'actions'];
  }

  ngOnInit(): void {
    this.getBrands();
  }

  searchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator)
      this.dataSource.paginator.firstPage();
  }

  getBrands(): void {
    this.brandService.getAllBrands().subscribe(data => {
      this.dataSource = new MatTableDataSource<Brand>(data);

      this.dataSource.filterPredicate = (data: Brand, filter: string) => {
        return data.name.trim().toLowerCase().indexOf(filter) !== -1
      }
      if (this.dataSource) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    },
      err => {
        console.log(err)
      },
    );
  }

  onSubmit() {
    const formBrand = this.brandForm.controls.names.value.map((data: any) => {
      return {
        name: data
      }
    })
    if (formBrand.length == 1) {
      this.brandService.saveBrand(formBrand[0]).subscribe(data => {
        console.log(data);
      })
    } else {
      this.brandService.saveManyBrand(formBrand).subscribe(data => {
        console.log(data);
      });
    }
  }

  get brands() {
    return this.brandForm.get('names') as FormArray
  }

  addField() {
    this.brands.push(new FormControl('', Validators.required))
  }

}
