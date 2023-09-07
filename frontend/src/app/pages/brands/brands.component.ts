//Módulos
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

// Material
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
const base_url = environment.base_url;

//Servicios

import { BrandsService } from 'src/app/services/brands.service';

//Modelos

import { Brand } from 'src/app/models/brand.model';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-brandss',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit, AfterViewInit {
  brand: Brand[] = [];

  dataSource!: MatTableDataSource<Brand>;
  displayedColumns: string[] = ['code', 'name', 'acciones'];
  isLoading: boolean = false;
  resultsLength = 0;

  constructor(private brandsService: BrandsService) {}

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
    this.brandsService.loadBrands().subscribe({
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

  deleteBrand(brand: Brand): void {
    Swal.fire({
      title: `¿Estás seguro de eliminar la marca ${brand.name}?`,
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
        this.brandsService.deleteBrand(brand.id)
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
