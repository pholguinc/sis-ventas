import { BrandsService } from 'src/app/services/brands.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Brand } from 'src/app/models/brand.model';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.css'],
})
export class BrandFormComponent implements OnInit {
  public isUpdate: string = '';
  public assets: any = [];
  public brandForm!: FormGroup;
  public title: string = '';
  public titleModule: string = 'Marca';
  public titleData: string = 'marca';
  public isLoading = false;

  public submitted = false;

  constructor(
    private brandsService: BrandsService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.dataBrand(id));
    this.brandForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
    });

    const id = this.activatedRoute.snapshot.params['id'];
    this.title = id === 'nuevo' ? 'Crear Nueva Marca' : 'Editar Marca';
    this.isUpdate = id === 'nuevo' ? 'Guardar' : 'Actualizar';
  }

  onSubmit() {
    const id = this.activatedRoute.snapshot.params['id'];

    if (id === 'nuevo') {
      this.isLoading = true;
      this.title = 'Crear Nuevo Cliente';
      this.brandsService.addBrand(this.brandForm.value).subscribe({
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
              this.router.navigate(['admin/mantenimientos/marcas']);
            }
          });
          console.log('Post Success', res);
        },
        error: (err) => {
          console.warn('Post error', err.error.msg);
        },
      });
    } else {
      this.title = 'Editar Cliente';
      this.brandsService.updateCustomer(id, this.brandForm.value).subscribe({
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
              this.router.navigate(['admin/mantenimientos/marcas']);
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

  dataBrand(id: string) {
    this.brandsService.brandId(id).subscribe((res) => {
      this.brandForm.patchValue(res);
    });
  }
}
