import { CategoriesService } from './../../../services/categories.service';

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/models/category.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, AfterViewInit {

  category: Category[] = [];

  dataSource!: MatTableDataSource<Category>;
  displayedColumns: string[] = ['code', 'name', 'acciones'];
  isLoading: boolean = false;
  resultsLength = 0;

  constructor(private categoriesService: CategoriesService) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.categoriesService.loadCategories().subscribe({
      next: (res) => {
        this.dataSource.data = res;
        console.log(res);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteCategory(category: Category): void {
    Swal.fire({
      title: `¿Estás seguro de eliminar la marca ${category.name}?`,
      text: 'Al eliminarlo no podrá recuperarlo',
      icon: 'info',
      buttonsStyling: false,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger',
      },
    }).then((result) => {
      if (result.value) {
        this.categoriesService.deleteCategory(category.id)
        .subscribe({
          next: (res)=>{
            this.loadData();
            Swal.fire({
              text: "¡Marca eliminada correctamente!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok",
              customClass: {
                  confirmButton: "btn btn-primary"
              }
          })

          }
        })
      }
    });
  }

}
