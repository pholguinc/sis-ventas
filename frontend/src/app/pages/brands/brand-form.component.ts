
import { BrandsService } from 'src/app/services/brands.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';


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
  public isLoading = false;

  constructor(
    private brandsService: BrandsService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(({id}) => this.dataBrand(id));
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

    if(id === 'nuevo'){
      this.isLoading = true;
      this.title = 'Crear Nuevo Cliente';
      this.brandsService.addBrand(this.brandForm.value).subscribe({
        next: (res) => {
          Swal.fire({
            title:"Correcto",
            text: "¡La marca fue registrada correctamente!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok",
            customClass: {
                confirmButton: "btn btn-primary"
            }
        });

          console.log('Upload success', res);
        },
        error: (err) => {

          console.warn('Upload error', err.error.msg)
        },

      });

    }else{

      this.title = 'Editar Cliente';
      this.brandsService.updateCustomer(id, this.brandForm.value)
      .subscribe({
        next: (res)=>{
          console.log('Actualizado', res)
        }
      })

    }



  }

  dataBrand(id: string){
    this.brandsService.brandId(id)
      .subscribe(
        res=>{
          this.brandForm.patchValue(res);
        }
      )
  }


}
