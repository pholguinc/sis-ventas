import { Product } from './../../../models/product.model';

import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Renderer2 } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {

  formModal:any;
  loading = false;
  public titleData: string = 'stock';

  dataSource!: MatTableDataSource<Product>;
  displayedColumns: string[] = [
    'code',
    'name',
    'stock',
    'price',
    'price_sale',
    'acciones',
  ];
  resultsLength = 0;
  public inventoryForm!: FormGroup;

  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    this.inventoryForm = this.fb.group({
      id: [''],
      stock: ['', Validators.required],
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
    });
  }

  dataProduct(id: string) {
    this.productsService.productId(id).subscribe((res) => {
      this.inventoryForm.patchValue(res);
    });
  }

  editStock(id:string) {
    console.log("el id del edit es:" + id)
    this.productsService.productId(id).subscribe((res) => {
      console.log(this.resultsLength)
      this.inventoryForm.patchValue(res);
    });

  }

  updateStock(id: string) {
    this.loading = true;
    setTimeout(() => {
      this.productsService.updateStock(id, this.inventoryForm.value).subscribe({
        next: (res) =>{
          Swal.fire({
            title: 'Correcto',
            text: `¡El ${this.titleData} fue actualizado correctamente!`,
            icon: 'success',
            buttonsStyling: false,
            confirmButtonText: 'Ok',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
          });
          this.loadData();
          this.hideModal();
          this.loading = false;
        },
        error: (err) =>{
          console.error(err.msg)
        }
      });
    }, 2000);

  }

  hideModal() {
    const modal = document.getElementById('mdlStock');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';

      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    }
  }




}
