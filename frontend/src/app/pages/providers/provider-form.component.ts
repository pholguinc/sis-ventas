import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProvidersService } from 'src/app/services/providers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.css']
})
export class ProviderFormComponent  implements OnInit{

  public isUpdate: string = '';
  public assets: any = [];
  public providerForm!: FormGroup;
  public title: string = '';
  public titleModule: string = 'Proveedor';
  public titleData: string = 'proveedor';
  public isLoading = false;
  public submitted = false;

  constructor(
    private providersService: ProvidersService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(({id}) => this.dataProvider(id));
    this.providerForm = this.fb.group({
      name: ['', Validators.required],
      ruc: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required,Validators.pattern('^[0-9]{9}$')]],
      address: ['', Validators.required],
    });

    const id = this.activatedRoute.snapshot.params['id'];
    this.title = id === 'nuevo' ? 'Crear Nuevo Proveedor' : 'Editar Proveedor';
    this.isUpdate = id === 'nuevo' ? 'Guardar' : 'Actualizar';
  }
  onSubmit(){
    const id = this.activatedRoute.snapshot.params['id'];
    this.submitted = true;
    if(id === 'nuevo'){
      this.providersService.addProvider(this.providerForm.value).subscribe({
        next: (res) => {
          Swal.fire({
            title: 'Correcto',
            text: `¡El ${this.titleData} fue registrado correctamente!`,
            icon: 'success',
            buttonsStyling: false,
            confirmButtonText: 'Ok',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['admin/mantenimientos/proveedores']);
            }
          });
          console.log('Upload success', res);
        },
        error: (err) => {

          console.warn('Upload error', err.error.msg)
        },
      });
    }else{
      this.providersService.updateProvider(id, this.providerForm.value)
      .subscribe({
        next: (res)=>{
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
              this.router.navigate(['admin/mantenimientos/proveedores']);
            }
          });
          console.log('Actualizado', res)
        }
      })
    }
  }

  dataProvider(id: string){
    this.providersService.providerId(id)
      .subscribe(
        res=>{
          this.providerForm.patchValue(res);
        }
      )
  }

}
