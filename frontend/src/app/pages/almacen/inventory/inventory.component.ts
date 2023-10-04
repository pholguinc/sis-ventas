import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  dataSource!: MatTableDataSource<Product>;
  displayedColumns: string[] = [
    'code',
    'name',
    'stock',
    'price',
    'price_sale',
    'acciones',
  ];
  isLoading: boolean = false;
  resultsLength = 0;
  public inventoryForm!: FormGroup;

  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {

    this.inventoryForm = this.fb.group({
      stock: [{value: '', disabled: true}, Validators.required],
    });
    this.dataSource = new MatTableDataSource();
    this.loadData();
  }

  loadData() {
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

  dataProduct(id: string) {
    this.productsService.productId(id).subscribe((res) => {
      this.inventoryForm.patchValue(res);
    });
  }

  editStock(id:string){
    this.productsService.productId(id).subscribe((res) => {
      this.inventoryForm.patchValue(res);
    });
  }
}
