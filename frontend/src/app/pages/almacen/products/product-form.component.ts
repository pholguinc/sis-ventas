import { CategoriesService } from 'src/app/services/categories.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand.model';
import { Category } from 'src/app/models/category.model';
import { BrandsService } from 'src/app/services/brands.service';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  public isUpdate: string = '';
  public assets: any = [];
  public productForm!: FormGroup;
  public title: string = '';
  public titleModule: string = 'Producto';
  public titleData: string = 'producto';
  public isLoading = false;
  public submitted = false;
  brand: Brand[] = [];
  category: Category[] = [];

  constructor(
    private productsService: ProductsService,
    private brandsService: BrandsService,
    private categoriesService:CategoriesService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.dataProduct(id));
    this.productForm= this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      stock: ['', Validators.required],
      price: ['', Validators.required],
      sale: ['', Validators.required],
    });
    const id = this.activatedRoute.snapshot.params['id'];
    this.title = id === 'nuevo' ? 'Registrar Nuevo Producto' : 'Editar Producto';
    this.isUpdate = id === 'nuevo' ? 'Guardar' : 'Actualizar';
    this.dataBrands()
    this.dataCategories()
  }

  onSubmit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.submitted = true;
    if (id === 'nuevo') {
      this.isLoading = true;
      this.productsService.addProduct(this.productForm.value).subscribe({
        next: (res) => {
          Swal.fire({
            title: 'Correcto',
            text: `¡El ${this.titleData} fue registrada correctamente!`,
            icon: 'success',
            buttonsStyling: false,
            confirmButtonText: 'Ok',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['admin/almacen/productos']);
            }
          });
          console.log('Post Success', res);
        },
        error: (err) => {
          console.warn('Post error', err.error.msg);
        },
      });
    } else {
      this.productsService.updateProduct(id, this.productForm.value).subscribe({
        next: (res) => {
          Swal.fire({
            title: 'Correcto',
            text: `¡El ${this.titleData} fue actualizado correctamente!`,
            icon: 'success',
            buttonsStyling: false,
            confirmButtonText: 'Ok',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['admin/almacen/productos']);
            }
          });
          console.log('Put Success', res);
        },
        error: (err) => {
          console.warn('Post error', err.error.msg);
        },
      });
    }
  }

  dataProduct(id: string) {
    this.productsService.productId(id).subscribe((res) => {
      this.productForm.patchValue(res);
    });
  }

  dataBrands(){
    this.brandsService.loadBrands()
    .subscribe({
      next: (res)=>{
        console.log(res);
        this.brand = res;
      },
      error:(err)=>{
        console.warn(err)
      }
    })
  }

  dataCategories(){
    this.categoriesService.loadCategories()
    .subscribe({
      next: (res)=>{
        console.log(res);
        this.category = res;
      },
      error:(err)=>{
        console.warn(err)
      }
    })
  }

}
