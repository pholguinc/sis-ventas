import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from './../../services/customers.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit{
  public isUpdate: string = '';
  public assets: any = [];
  public customerForm!: FormGroup;
  public title: string = '';
  public titleModule: string = 'Cliente';
  public isLoading = false;

  constructor(
    private customersService: CustomersService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(({id}) => this.dataBrand(id));
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      lastname_pater: ['', Validators.required],
      lastname_mater: ['', Validators.required],
      numDoc: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
    });
    const id = this.activatedRoute.snapshot.params['id'];
    this.title = id === 'nuevo' ? 'Crear Nuevo Cliente' : 'Editar Cliente';
    this.isUpdate = id === 'nuevo' ? 'Guardar' : 'Actualizar';
  }

  onSubmit(){
    const id = this.activatedRoute.snapshot.params['id'];

    if(id === 'nuevo'){
      this.isLoading = true;
      this.title = 'Crear Nuevo Cliente';
      this.customersService.addCustomer(this.customerForm.value).subscribe({
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
      this.customersService.updateCustomer(id, this.customerForm.value)
      .subscribe({
        next: (res)=>{
          console.log('Actualizado', res)
        }
      })

    }
  }


  dataBrand(id: string){
    this.customersService.customerId(id)
      .subscribe(
        res=>{
          this.customerForm.patchValue(res);
        }
      )
  }

}
