import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from '@data/models/brand';
import { BrandService } from '@data/services/brand.service';
import Swal from 'sweetalert2';
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
  
  hiddenButton: boolean;
  id: number;
  brandForm = new FormGroup({
    names: new FormArray([
      new FormControl('', Validators.required)
    ])
  });
  constructor(
    private brandService: BrandService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.displayedColumns = ['id', 'name', 'actions'];
  }

  ngOnInit(): void {
    this.getBrands();
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id > 0) {
      this.hiddenButton = true
      this.getBrandById(this.id);
    }
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
      if (this.id > 0) {
        this.brandService.editBrand(this.id, formBrand[0]).subscribe(data => {
          console.log(data);
          Swal.fire({
            icon: 'success',
            title: 'Marca editada.',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/dashboard/categories'])
            }
          });
        })
      }else{
        this.brandService.saveBrand(formBrand[0]).subscribe(data => {
          console.log(data);
          Swal.fire({
            icon: 'success',
            title: 'Marca guardada.',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        })
      }
    } else {
      this.brandService.saveManyBrand(formBrand).subscribe(data => {
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Marcas guardadas.',
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      });
    }
  }

  onEdit(id: number) {
    this.router.navigate(['/dashboard/brands/' + id]);
  }

  getBrandById(id: number) {
    this.brandService.getBrand(id).subscribe(data => {
      this.brands.controls.forEach(n => {
        n.setValue(data.name)
      })
    });
  }

  onDelete(id: number) {
    this.brandService.deleteBrand(id).subscribe(data => {
      console.log(data)
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
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: err.error.message,
          confirmButtonText: 'Volver'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/dashboard/categories'])
          }
        });
      })
  }

  get brands() {
    return this.brandForm.get('names') as FormArray
  }

  addField() {
    this.brands.push(new FormControl('', Validators.required))
  }

}
