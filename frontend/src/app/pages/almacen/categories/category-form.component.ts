import { CategoriesService } from './../../../services/categories.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit {
  public isUpdate: string = '';
  public assets: any = [];
  public categoryForm!: FormGroup;
  public title: string = '';
  public titleModule: string = 'Categoría';
  public titleData: string = 'categoría';
  public isLoading = false;
  public submitted = false;
  dataSource!: MatTableDataSource<Category>;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private categoriesService: CategoriesService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.dataBrand(id));
    this.categoryForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
    });

    const id = this.activatedRoute.snapshot.params['id'];
    this.title = id === 'nuevo' ? 'Crear Nueva Categoría' : 'Editar Categoría';
    this.isUpdate = id === 'nuevo' ? 'Guardar' : 'Actualizar';
  }

  onSubmit() {
    const id = this.activatedRoute.snapshot.params['id'];

    this.submitted = true;
      if (id === 'nuevo') {
        this.isLoading = true;
        this.title = 'Crear Nueva Categoría';
        this.categoriesService.addCategory(this.categoryForm.value).subscribe({
          next: (res) => {
            Swal.fire({
              title: 'Correcto',
              text: `¡La ${this.titleData} fue registrada correctamente!`,
              icon: 'success',
              buttonsStyling: false,
              confirmButtonText: 'Ok',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['admin/almacen/categorias']);
              }
            });
            this.dataSource.sort = this.sort;
            console.log('Upload success', res);
          },
          error: (err) => {
            console.warn('Upload error', err.error.msg);
          },
        });
      } else {
        this.title = 'Editar Cliente';
        this.categoriesService
          .updateCategory(id, this.categoryForm.value)
          .subscribe({
            next: (res) => {
              Swal.fire({
                title: 'Correcto',
                text: `¡La ${this.titleData} fue actualizada correctamente!`,
                icon: 'success',
                buttonsStyling: false,
                confirmButtonText: 'Ok',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(['admin/almacen/categorias']);
                }
              });
              console.log('Actualizado', res);
            },
          });
      }
  }

  dataBrand(id: string) {
    this.categoriesService.categoryId(id).subscribe((res) => {
      this.categoryForm.patchValue(res);
    });
  }
}
