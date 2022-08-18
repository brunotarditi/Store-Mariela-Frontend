import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '@data/models/category';
import { CategoryService } from '@data/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  
  text: string = 'Categorías';
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns: string[];
  dataSource: MatTableDataSource<Category>;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  brandForm = new FormGroup({
    names: new FormArray([
      new FormControl('', Validators.required)
    ])
  });
  constructor(private categoryService: CategoryService) {
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
    this.categoryService.getAllCategories().subscribe(data => {
      this.dataSource = new MatTableDataSource<Category>(data);

      this.dataSource.filterPredicate = (data: Category, filter: string) => {
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
    // if (formBrand.length == 1) {
    //   this.categoryService.saveBrand(formBrand[0]).subscribe(data => {
    //     console.log(data);
    //   })
    // } else {
    //   this.categoryService.saveManyBrand(formBrand).subscribe(data => {
    //     console.log(data);
    //   });
    // }
  }

  get brands() {
    return this.brandForm.get('names') as FormArray
  }

  addField() {
    this.brands.push(new FormControl('', Validators.required))
  }

}
