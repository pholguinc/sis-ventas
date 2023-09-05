//Módulos
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

// Material
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
const base_url = environment.base_url;

//Servicios

import { BrandsService } from 'src/app/services/brands.service';

//Modelos

import { Brand } from 'src/app/models/brand.model';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-brandss',
  templateUrl: './brands.component.html',
  styleUrls: [
    './brands.component.css'
  ]
})
export class BrandsComponent implements OnInit, AfterViewInit {

  base_url!:string;
  brand: Brand[] = [];

  dataSource!: MatTableDataSource<Brand>;
  displayedColumns: string[] = ['image','code','name', 'acciones'];
  isLoading: boolean = false;
  resultsLength = 0;

  constructor(private brandsService: BrandsService){}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.loadData();
    this.base_url = environment.base_url;
  }

  loadData() {
    this.isLoading = true;
    this.brandsService.loadBrands().subscribe({
      next: (res) => {
        this.dataSource.data = res;
        console.log(res)
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}




