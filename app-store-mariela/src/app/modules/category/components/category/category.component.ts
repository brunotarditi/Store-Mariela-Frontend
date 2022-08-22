import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '@data/models/category';
import { CategoryService } from '@data/services/category.service';
import { TokenService } from '@data/services/token.service';
import Swal from 'sweetalert2';

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
  isLogged = false;
  isAdmin = false;
  id: number;
  categoryForm = new FormGroup({
    name : new FormControl('', Validators.required),
  });

  constructor(
    private categoryService: CategoryService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService) {
    this.displayedColumns = ['id', 'name', 'actions'];
  }

  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin();
    this.isLogged = this.tokenService.isLogged();
    this.getCategories();
    this.id = this.activatedRoute.snapshot.params['id'];
    if(this.id > 0){
      this.getCategoryById(this.id);
    }
  }

  searchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator)
      this.dataSource.paginator.firstPage();
  }

  getCategories(): void {
    this.categoryService.getAllCategoriesEnabled().subscribe(data => {
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

  onSubmit(category: Category) {
    if (this.id > 0) {
      this.categoryService.editCategory(this.id, category).subscribe(data => {
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Categoria editada.',
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/dashboard/categories'])
          }
        });
      })
    } else {
      this.categoryService.saveCategory(category).subscribe(data => {
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Categoria guardada.',
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      });
    }
  }

  onEdit(id:number){
    this.router.navigate(['/dashboard/categories/' + id]);
    
  }

  getCategoryById(id:number){
    this.categoryService.getCategory(id).subscribe(data => {
      this.categoryForm.setValue({
        'name': data.name,
      })
    });
  }

  onDelete(id:number){
    this.categoryService.deleteCategory(id).subscribe(data => {
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

}
