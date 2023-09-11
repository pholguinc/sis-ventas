import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})


export class ProductsComponent {
  dataSource!: MatTableDataSource<Product>;
  displayedColumns: string[] = ['code', 'name','stock','price','price_sale','acciones'];
  isLoading: boolean = false;
  resultsLength = 0;



  constructor(private productsService: ProductsService) {}

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
    this.productsService.loadProducts().subscribe({
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

  deleteProduct(product: Product){}





}
