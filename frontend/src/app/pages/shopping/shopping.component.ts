import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { Provider } from 'src/app/models/provider.model';
import { ProductsService } from 'src/app/services/products.service';
import { ProvidersService } from 'src/app/services/providers.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit, AfterViewInit {

  maxRowsToShow = 3;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  product: Product[] = [];
  provider: Provider[] = [];

  dataSource!: MatTableDataSource<Product>;

  displayedColumns: string[] = ['code', 'name', 'stock','acciones'];

  constructor(
    private productsService:ProductsService,
    private providersService: ProvidersService
    ){}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.loadProducts();
    this.loadProviders();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  applyProviderFilter(event: Event) {
    const target = event.target as HTMLSelectElement; // Convierte el objetivo a un elemento HTMLSelectElement
    if (target) {
      const value = target.value; // Accede a la propiedad value solo si target es válido
      this.dataSource.filter = value || ''; // Asigna un valor vacío si value es null o undefined
    }
  }


  loadProducts(){
    this.productsService.loadProducts()
    .subscribe({
      next: (res)=>{
        this.dataSource.data = res.slice(0, this.maxRowsToShow);
      },
      error: (err)=>{
        console.warn(err.msg.error)
      }
    })
  }

  loadProviders(){
    this.providersService.loadProviders()
    .subscribe({
      next: (res)=>{
        this.provider = res;
      },
      error: (err)=>{
        console.warn(err.msg.error)
      }
    })
  }
}
